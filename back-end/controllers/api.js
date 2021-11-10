const imgSaver = require("../helpers/img-saver")

module.exports.saveFile = async (req, res) => {
  let {image} = req.body
  if(image) {
    const filename = await imgSaver(image, 'image')
    res.json({message: `Файл загружен. Имя файла: ${filename}`})
    return
  }
  res.json({message: "В запросе отсутствует фотография - image!"})
}
module.exports.saveFiles = async (req, res) => {
  let {images} = req.body
  if(images) {
    if(images.length < 5) {
      let filenames = Array()
      let filename = ''
        for(let i = 0; i < images.length; i++){
          filename = await imgSaver(images[i], 'images')
          filenames.push(`${filename}`)
        }
        res.status(200).json({message: `Ваши файлы загружены (${filenames.length})!\n${filenames.join(`\n`)}`})
    } else {
      res.status(500).json({message: "Превышен лимит, нельзя добавить более 5 фотографий!"})
    }
  } else {
    res.status(500).json({message:"В запросе отсутствуют фотографии"})
  }

}