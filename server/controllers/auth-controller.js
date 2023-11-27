if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Op } = require('sequelize');
const { Song, User, Golongan } = require('../models');
const { getPagination, getPagingData } = require('../helpers/pagination');

// prettier-ignore
class Controller {
  //

  static async getAll(limit, offset) {
    try {
      const instanceSongs = await Song.findAndCountAll({
        attributes: ['judul', 'artis', 'judul3', 'exjudul', 'artis3', 'exartis', 'GolId', 'JenisId', 'vol'],
        limit: limit || 10,
        offset: offset || 0,
      });
      return instanceSongs;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSearchTitle(limit, offset, title) {
    try {
      const instanceSongs = await Song.findAndCountAll({
        where: {
          [Op.or]: [
            {
              judul: { [Op.iLike]: `%${title}%` },
            },
            {
              judul3: { [Op.iLike]: `%${title}%` },
            },
            {
              exjudul: { [Op.iLike]: `%${title}%` },
            },
          ],
        },
        attributes: ['judul', 'artis', 'judul3', 'exjudul', 'artis3', 'exartis', 'GolId', 'JenisId', 'vol'],
        limit: limit || 10,
        offset: offset || 0,
      });
      return instanceSongs;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSearchArtist(limit, offset, artist) {
    try {
      const instanceSongs = await Song.findAndCountAll({
        where: {
          [Op.or]: [
            {
              artis: { [Op.iLike]: `%${artist}%` },
            },
            {
              artis3: { [Op.iLike]: `%${artist}%` },
            },
            {
              exartis: { [Op.iLike]: `%${artist}%` },
            },
          ],
        },
        attributes: ['judul', 'artis', 'judul3', 'exjudul', 'artis3', 'exartis', 'GolId', 'JenisId', 'vol'],
        limit: limit || 10,
        offset: offset || 0,
      });
      return instanceSongs;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSearch(limit, offset, title, artist) {
    try {
      const instanceSongs = await Song.findAndCountAll({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  artis: { [Op.iLike]: `%${artist}%` },
                },
                {
                  artis3: { [Op.iLike]: `%${artist}%` },
                },
                {
                  exartis: { [Op.iLike]: `%${artist}%` },
                },
              ],
            },
            {
              [Op.or]: [
                {
                  judul: { [Op.iLike]: `%${title}%` },
                },
                {
                  judul3: { [Op.iLike]: `%${title}%` },
                },
                {
                  exjudul: { [Op.iLike]: `%${title}%` },
                },
              ],
            },
          ],
        },
        attributes: ['judul', 'artis', 'judul3', 'exjudul', 'artis3', 'exartis', 'GolId', 'JenisId', 'vol'],
        limit: limit || 10,
        offset: offset || 0,
        order: [['judul', 'ASC']],
      });
      return instanceSongs;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSongs(req, res, next) {
    try {
      if (!req.query.title && !req.query.artis) {
        console.log('MASUK GET ALL', '<-------------');
        const { limit, offset } = req.query;
        const instanceSongs = await Controller.getAll(limit ? limit : 10, offset ? offset : 0);
        return res.status(200).json(instanceSongs);


      } else if (req.query.title && !req.query.artis) {
        console.log('MASUK TITLE DOANG', '<-------------');
        const { title, limit, offset } = req.query;
        const instanceSongs = await Controller.getSearchTitle(limit, offset, title);
        return res.status(200).json(instanceSongs);


      } else if (req.query.artis && !req.query.title) {
        console.log('MASUK ARTIS DOANG', '<-------------');
        const { artis, limit, offset } = req.query;
        const instanceSongs = await Controller.getSearchArtist(limit, offset, artis);
        return res.status(200).json(instanceSongs);


      } else {
        console.log('MASUK SEARCH MODE', '<-------------');
        const { artis, title, limit, offset } = req.query;
        const instanceSongs = await Controller.getSearch(10, 0, title, artis);
        return res.status(200).json(instanceSongs);
      }

    } catch (error) {
      next(error);
    }
  }

  static async getAllSongNew(req,res,next) {
    try {
        let {s , page= 0, size= 10, gol} = req.query

        const {limit , offset} = getPagination(page, size)

            let where = {[Op.or]: []}

        if(s && typeof s === 'string') {
            where[Op.or].push(
            {
                judul: {[Op.iLike]: `%${s}%` }
            },
            {
                judul3: {[Op.iLike]: `%${s}%` }
            },
            {
                exjudul: {[Op.iLike]: `%${s}%` }
            },
            {
                artis: {[Op.iLike]: `%${s}%` }
            },
            {
                artis3: {[Op.iLike]: `%${s}%` }
            },
            {
                exartis: {[Op.iLike]: `%${s}%` }
            },
            )
        }

        console.log({where});

        const data = await Song.findAndCountAll({where, include: [{model: Golongan, attributes: ["id","name"]}]})

        const response = getPagingData(data, page, limit)
        return res.status(200).json(response)

    } catch (error) {
        next(error);
    }
  }
}

module.exports = Controller;
