## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|

### Association

- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :chats

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null; false|

### Association

- has_many :chats
- has_many :users, through: :groups_users
- has_many :groups_users

## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foregin_key: true|

### Association
- belongs_to :group
- belongs_to :user
