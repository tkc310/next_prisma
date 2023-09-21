Next.js x Prisma x Supabaseを素振りするリポジトリ  
api routesにメールアドレスxパスワード認証APIを生やしている  

なお、Supabaseとのつなぎ込みは `.env` 内の `DATABASE_URL` を変えるだけで良いためコード上では表現されていない  

## 考察

下記経緯からサンプルを作るに至った  
- 無料でDB付きのAPIをホスティングしたい  
- 静的ではないWebサービスのホスティング先としてダウンタイム無しで無料で使おうとすると、使い勝手も含めてvercel一択になると思っている  
(render.comはダウンタイムがある、その他は直ぐに無料期間・従量が終わる)  
- RDBについては他にもあるかもしれないけど知名度・使い勝手的にsupabaseが良さそう (vercel postgresに期待)  
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

## CLI

[command reference](https://www.prisma.io/docs/reference/api-reference/command-reference#db)

- `prisma db push` - マイグレーションせずにschema to db
- `prisma db pull` - db to schema -> 外部サービスから作成・利用されているテーブルをschema.prismaに反映
  - `--print` - dry run
- `prisma generate` - クライアントコード `prisma.xxx` の生成・更新
- `prisma migrate deploy` - db to schema, dbとschemaの差分を検出して未実行のマイグレーションのみ行われる
- `prisma migrate dev` - マイグレーションファイル生成、クライアントコードの生成・更新
- `prisma reset` - db再作成
- `prisma resolve` - 失敗としてマークされたマイグレーションをスキップして実行
- `prisma status` - マイグレーションの適用状況を出力 (ファイルとmigrationsテーブルの読み取り)

## Query Method

[model queries](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#model-queries)

- findUnique - 引数: id or attribute, return: 単一レコード
- findFirst - return: 先頭レコード
- findMany - 引数: SQL条件句, return 複数レコード
- create
- update
- upsert
- delete
- createMany - bulk create
- updateMany - bulk update
- deleteMany - bulk delete
- aggregate - 引数: SQL条件句, return 集約オブジェクト (count, sum, avg, min, maxメソッドが生えている)
- count
- groupBy

### JOIN
include or select引数を利用する  
カラムを制限する場合はselect、全カラム取得の場合はinclude  
https://wp-kyoto.net/prisma-select-relational-table-data/

## Rollback (downgrade script)
rollbackするための機能は持っている。  
downgrade sqlを生成するCLIオプションも存在している。  
https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate/generating-down-migrations

