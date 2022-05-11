cd ../oakui
call npm run build-only
call npm run copy-css
call npm run move-package
cd ../npm-oakui
call npm pack
call npm run move-package
call npm run move-package-to-oneauth
call npm run move-package-to-janus
call npm run move-package-to-metamind
cd ../metamind-new
call npm i .\oakui-core-stage-1.0.0.tgz
call npm start
