json.image json.image
json.content @message.content
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.updated_at @message.updated_at.strftime("%Y/%m/%d %H:%M")
json.user @message.user.name
json.id @message.id