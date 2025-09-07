# BotD-Enhanced

Enhanced version of [BotD](https://github.com/fingerprintjs/BotD) with more checks.

Patches managed using the nq tool.

## Setup: clone repo + install nq + first nq setup

### 1) Git clone with submodules

```bash
git clone --recurse-submodules https://github.com/unixfox/BotD-enhanced.git
cd BotD-enhanced
```

### 2) Install nq

```
pip install git+https://github.com/lmstudio-ai/nq.git
```

If your Linux distribution doesn't allow you to use `pip install`.

Try with `pip install --user` or with a virtualenv:
```
virtualenv venv
source venv/bin/activate
pip install git+https://github.com/lmstudio-ai/nq.git
```

### 3) First time setup

1. `nq apply botd` - Apply existing patches
2. `nq status botd` - Check everything is clean

## Using nq

### Daily workflow

1. `nq pull botd` - Pull changes from remote
2. `cd botd` - Go into submodule
3. Make your changes and commit
4. `cd ..`
5. `nq export botd` - Save changes as patches
6. `nq status botd` - Check everything is clean

### Apply patches
```bash
nq apply botd
```

### Check status
```bash
nq status botd
```

### Make changes
```bash
cd botd
# Make your changes and commit them
git add .
git commit -m "Your changes"
```

### Export your changes as patches
⚠ In the parent project (botd-enhanced)

```bash
nq export botd
```

### Reset to clean state
⚠ In the parent project (botd-enhanced)

```bash
nq reset botd
```

### Edit existing patch

1. `cd botd` - Go to the submodule directory
2. `git log` - Find the commit/patch you want to edit
3. `git rebase --interactive 6c391e~` - The commit you want to edit
4. Do your changes
5. `git add yourchanges`
6. `git rebase --continue`
7. `cd ..`
8. `nq export botd`
9. Commit your changes

### Update submodule
⚠ In the parent project (botd-enhanced)

```bash
nq pull botd
nq reset botd
git checkout main
git pull origin main
cd ../..
git add botd
git commit -m "update against latest commit botd"
nq apply botd
```
