FROM keymetrics/pm2:18-buster

COPY .output /.output

COPY ecosystem.config.js /

CMD ["/bin/bash", "-c", "pm2-runtime start ecosystem.config.js"]
