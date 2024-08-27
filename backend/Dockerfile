# Resmi bir Python runtime imajını kullanın
FROM python:3.11-slim

# Ortam değişkenlerini ayarlayın
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Çalışma dizinini ayarlayın
WORKDIR /usr/src/app

# Gereken dosyaları konteynere kopyalayın
COPY requirements.txt /usr/src/app/

# Bağımlılıkları yükleyin
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install django-cors-headers djangorestframework-simplejwt

# Uygulama kodunu kopyalayın
COPY . /usr/src/app/

# Portu expose edin
EXPOSE 8000

# Uygulamayı çalıştırın
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "task.wsgi:application"]
