#!/bin/sh

git push gandi
ssh 883015@git.dc0.gpaas.net 'deploy default.git'

