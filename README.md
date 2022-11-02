# Openjira ejemplo

Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__

MongoDB URL:
```
mongodb://localhost:27017/tesloDB
```

El url se utiliza en las variables de entorno y si se requiere en mongo compass.

* Reconstruir módulos de node

```
npm install
```