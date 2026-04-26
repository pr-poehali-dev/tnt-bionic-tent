import json
import os
import urllib.request
import boto3

def handler(event, context):
    '''
    Скачивает GLB-модель по URL и сохраняет в S3-бакет проекта.
    Возвращает публичный CDN-URL загруженной модели.
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    src_url = body.get('url', '').strip()
    key_name = body.get('key', 'models/tent.glb').strip()

    if not src_url:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'url is required'}),
        }

    if 'dropbox.com' in src_url and 'dl=0' in src_url:
        src_url = src_url.replace('dl=0', 'dl=1')
    elif 'dropbox.com' in src_url and 'dl=' not in src_url:
        sep = '&' if '?' in src_url else '?'
        src_url = f'{src_url}{sep}dl=1'

    req = urllib.request.Request(src_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = resp.read()

    size = len(data)

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(
        Bucket='files',
        Key=key_name,
        Body=data,
        ContentType='model/gltf-binary',
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key_name}"

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'url': cdn_url, 'size': size, 'key': key_name}),
    }
