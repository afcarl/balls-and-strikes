# Ansible configuration

## Configuration

Before getting started with Ansible, add this line to your shell configuration:

```bash
export ANSIBLE_SSH_ARGS="-o ForwardAgent=yes"
```

This ensures that Ansible will always forward your keys.

### Global Vars

Before attempting to deploy, you'll probably want to change the
`group_vars/all` configuration. Specifically, altering `git_repo`
to reflect your own repo URL, and then altering app paths to suit
your personal layout ideals.

## Basic Deployment

Included in this repo is an example deployment inventory and playbook,
meant for deploying into a Vagrant environment running locally at
`192.168.0.101`.

```shell
$ cd ansible
$ ansible-playbook -i internal playbooks/internal.yml
```
