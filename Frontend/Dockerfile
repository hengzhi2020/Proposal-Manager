FROM node:11.10.0

RUN wget http://aia.pki.va.gov/PKI/AIA/VA/VA-Internal-S2-RCA1-v1.cer && \
    openssl x509 -inform der -in VA-Internal-S2-RCA1-v1.cer -out VA.pem && \
    cp VA.pem /usr/local/share/ca-certificates/VA.pem
ENV NODE_EXTRA_CA_CERTS /usr/local/share/ca-certificates/VA.pem

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install
COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
