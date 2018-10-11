#!/bin/bash

API="http://localhost:4741"
URL_PATH="/mailer"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "mail": {
      "from": "'"${FROM}"'",
      "to": "'"${TO}"'",
      "subject": "'"${SUBJECT}"'",
      "html": "'"${HTML}"'"
    }
  }'

echo
