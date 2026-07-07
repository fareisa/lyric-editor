# Just simple app for managing lyric my local music
Using vite.js + react for frontend and node for backend 
Theres container version you can see at `docker-compose.yml`

what it can do ?
1. ofcourse editing lyric
2. support multiple source. Local, fetch (liblrc only) and paste
3. support transfrom lyric from japanese write using kuromojianalyzer and kuroshiro only to romaji
4. support translation using google translate endpoint (https://github.com/ssut/py-googletrans/issues/268)
5. for transform and translation, result can be in different profile you can see at file `backend/src/constants/transform-profile.js`

available ENV on container was 
BACKEND_HOST=127.0.0.1 (for host binding backend use)
BACKEND_PORT=3000 (for port binding backend use)
MUSIC_DIR= /music (music path in container)

**Not well documented yet, may be next time**
