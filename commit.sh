#!/bin/bash
# Upload files to Github - git@github.com:talesCPV/roseta.git

read -p "Are you sure to commit Roseta Project to GitHub ? (Y/n)" -n 1 -r
echo 
if [[ $REPLY =~ ^[Yy]$ ]]
then

    cp ~/Documentos/SQL/roseta/*.sql sql/

    git init

    git add assets/
    git add data/
    git add scripts/
    git add style/
    git add templates/
    git add sql/
    git add files/
    git add backend/
    git add commit.sh
    git add index.html

    git commit -m "by_script"

#    git branch -M main
#    git remote add origin git@github.com:talesCPV/roseta.git
    git remote set-url origin git@github.com:talesCPV/roseta.git

    git push -u -f origin main

fi