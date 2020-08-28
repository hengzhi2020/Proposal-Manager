# Proposal Management 

## Deployment with docker

### Requiremnts

#### For development
- nodejs 14.8.0
- mysql 5.7

I recommend using nvm to manage node. Here's an example install:
```
wget https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
sudo rpm -ivh mysql57-community-release-el7-9.noarch.rpm
sudo yum install mysql-server
sudo systemctl start mysqld
sudo grep 'temporary password' /var/log/mysqld.log
sudo mysql_secure_installation
git clone https://github.com/hengzhi2020/Proposal-Manager.git
cd Proposal-Manager
mysql -u root -p$MYSQL_PASS < ci/init.sql
mysql -u root -p$MYSQL_PASS Proposals_MRS < ci/set_reviewers.sql

cd proposalmgr
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install 14.8.0
npm install -g yarn
yarn install
yarn run dev
```

#### Using docker
- docker-ce
- docker-compose

For use on a local machine set urls in `ci/webpack.config.js` to `http://localhost:7000`. Then run the desired make commands below.

### Usage

To be run on a manager node.

- `make`: builds images and deploys `proposalmgr` stack
- `make build`: builds the `proposalmgr` image
- `make start`: deploys `proposalmgr` stack
- `make stop`: removes `proposalmgr` stack

