#!/bin/bash

while getopts n: flag
do
    case "${flag}" in
        n) filename=${OPTARG};;
    esac
done

IFS='-'
read -ra arr <<< "$filename"
for i in "${arr[@]:1}";
do 
  declare -l tablename=$i
done

cat > ./src/database/migrations/$(date +"%Y%m%d%H%M%S")-"$filename".ts << EOF
import { QueryInterface, DataTypes } from "sequelize";
module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface): Promise<void> => {
  /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('${tablename}s', { id: DataTypes.INTEGER });
     */
  },
  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface): Promise<void> => {
    // If migration fails, this will be called. Rollback your migration changes.
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('${tablename}s');
     */
  },
};
EOF