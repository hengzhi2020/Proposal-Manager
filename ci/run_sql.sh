docker exec -it $(docker ps -qf name=proposalmgr_mysql-db) mysql -u dbuser -pdbuser#1812 Proposals_MRS -e "$(cat $1)"

