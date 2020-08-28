FROM node:14.8.0

RUN wget http://aia.pki.va.gov/PKI/AIA/VA/VA-Internal-S2-RCA1-v1.cer && \
    openssl x509 -inform der -in VA-Internal-S2-RCA1-v1.cer -out VA.pem && \
    cp VA.pem /usr/local/share/ca-certificates/VA.pem
ENV NODE_EXTRA_CA_CERTS /usr/local/share/ca-certificates/VA.pem

RUN mkdir -p /app
WORKDIR /app

RUN apt-get update && \
    apt install -y libglu1 libxi6 libgconf-2-4 && \
    ldconfig

COPY yarn.lock package.json /app/

RUN yarn install
COPY . /app
RUN yarn run build

EXPOSE 8000

CMD ["yarn", "start"]

