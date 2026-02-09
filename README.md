### Webapp template to deploy static websites

Static website template.

Place the files to serve under `www`, these will be served by the web server
(NGINX).


#### Build/Run the docker image

This could be useful to test your website before deploying it.

Build:

```bash
$ docker build -t website-template .
```

Then run the container:

```bash
$ docker run -p 80:80 website-template .
```

You can see your website in the browser by visiting
[http://localhost:80](http://localhost:80).
