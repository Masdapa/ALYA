exports.run = {
   usage: ['emojimix'],
   hidden: ['mix', 'emojimix'],
   use: 'emoji + emoji',
   category: 'converter',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         let exif = global.db.setting
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, '😳+😩'), m)
         let [emo1, emo2] = text.split`+`
         if (!emo1 || !emo2) return client.reply(m.chat, Func.texted('bold', `🚩 Berikan 2 emoticon untuk di mix.`), m)
         let json = await Api.emojimix(emo1 + '_' + emo2)
         return await client.sendSticker(m.chat, img, m, {
            packname: exif.sk_pack,
            author: exif.sk_author,
         })
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
}