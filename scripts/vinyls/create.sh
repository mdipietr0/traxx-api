#!/bin/bash

API="http://localhost:4741"
URL_PATH="/vinyls"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "vinyl": {
      "vinyl_id": "'"${VINYLID}"'",
      "collection_type": "'"${COLL}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo
