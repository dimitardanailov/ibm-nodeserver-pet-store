#!/usr/bin/env bash

END_POINT="http://localhost:3000/api/pets/create"

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{}' \
  http://localhost:3000/api/pets/create?[1-25000]
