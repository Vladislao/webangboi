# webangboi

```shell
npm run start
npm run webpack
```

### ENOSPC?
```shell
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```