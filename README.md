Next.js x Prisma x Supabaseを素振りするリポジトリ  
api routesにメールアドレスxパスワード認証APIを生やしている  

なお、Supabaseとのつなぎ込みは `.env` 内の `DATABASE_URL` を変えるだけで良いためコード上では表現されていない  

## 考察

下記経緯からサンプルを作るに至った  
- 無料でDB付きのAPIをホスティングしたい  
- 静的ではないWebサービスのホスティング先としてダウンタイム無しで無料で使おうとすると、使い勝手も含めてvercel一択になると思っている  
(render.comはダウンタイムがある、その他は直ぐに無料期間・従量が終わる)  
- RDBについては他にもあるかもしれないけど知名度・使い勝手的にsupabaseが良さそう  
- ある程度マネタイズできたらsupabaseからawsなどに移管したいためsupabaseクライアントに依存したくない
- prismaを使えばsupabaseに依存しない

作ってみて思ったこと  
- prisma x supabaseすごい (prisma studioでローカルからsupabase参照したりマイグレーションしたり)  
- prisma単体でみてもproduction readyだと思った  
- vercelを使いたかったのでnext.jsを使ったけど、疎結合にできたのでnest.jsなどへの移管も楽にできそう  
- サクッと作るためにGraphQL, OpenAPI使わなかったけどnext.js単体で使うならtRPCで型つけてもいいかも  
https://zenn.dev/is_ryo/articles/08a9710d9f6ee2  
- なお、1週間アクセスしてないとプロジェクトが消える (restoreする必要がある)

## Introduction

```
# node & npm
$ nodenv install 18.13.0
$ nodenv rehash
$ npm i

# db (install docker and docker-compose beforehand)
$ docker-compose up
$ npm run db:init
$ npm run db:seed
$ docker container exec -it db bash
$ psql -d test_db
$ \dt
# => listed test_db tables

# githooks
$ brew install lefthook
$ lefthook install

# create .env
$ touch .env
$ echo "DATABASE_URL=postgresql://root:secret@localhost:5432/test_db" >> .env
```

## Usage

```
# development build (Live Reload)
$ npm run dev
```
