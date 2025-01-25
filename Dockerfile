# Указываем базовый образ
FROM node:18

# Установка netcat (nc)
RUN apt-get update && apt-get install -y netcat-openbsd

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (включаем devDependencies, так как нужен concurrently)
RUN npm install

# Копируем весь исходный код
COPY . .

# Указываем порт, который будет слушать приложение
EXPOSE 5555

# Команда для запуска приложения
CMD ["npm", "start"]