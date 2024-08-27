# My Django App

Bu, Docker ile konteynerize edilmiş bir Django uygulamasıdır.

## Gereksinimler

- Docker yüklü olmalıdır

## Kurulum

1. **Depoyu klonlayın:**

    ```bash
    git clone https://github.com/yourusername/my_django_app.git
    cd my_django_app
    ```

2. **Docker imajını oluşturun:**

    ```bash
    docker build -t my_django_app .
    ```

3. **Docker konteynerini çalıştırın:**

    ```bash
    docker run -d -p 8000:8000 my_django_app
    ```

4. **Uygulamayı tarayıcıda açın:**

    `http://localhost:8000` adresine gidin.

## Notlar

- `requirements.txt` dosyasının güncel olduğundan emin olun.
- `Dockerfile`ı üretim ortamına uygun şekilde güncelleyin.
