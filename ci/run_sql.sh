cat $1 | docker exec -i $(docker ps -qf name=proposalmgr_mysql-db) mysql -u dbuser -pdbuser#1812 Proposals_MRS

