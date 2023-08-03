## Dev locally

```
npm i
env-cmd npx functions-framework --target=dalle
```

## Deploy

```
gcloud functions deploy dalle \
--allow-unauthenticated \
--runtime=nodejs18 \
--update-env-vars OPENAI_API_KEY=PASTE_KEY_HERE \
--trigger-http
```
