#!/usr/bin/env bash
echo "> PHYMMR 배포"
sudo su
cd /home/ec2-user/meomureum-next
chmod +x ./deploy.sh
npm -v
npm install next@latest
npx next start