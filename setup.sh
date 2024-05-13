#!/usr/bin/env bash

# Install Puppet
sudo apt-get update
sudo apt-get install -y puppet

# Run setup.pp
sudo puppet apply setup.pp