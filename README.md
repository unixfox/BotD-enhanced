# BotD-Enhanced

Enhanced version of [BotD](https://github.com/fingerprintjs/BotD) with more checks.

Patches managed using the nq tool.

## Setup: clone repo + install nq

```bash
git clone --recurse-submodules https://github.com/unixfox/BotD-enhanced.git
cd BotD-enhanced
### Install nq
pip install git+https://github.com/lmstudio-ai/nq.git
```

## Using nq

## Daily workflow

1. `nq apply botd` - Apply existing patches
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

### Update submodule
⚠ In the parent project (botd-enhanced)

```bash
nq pull botd
```
