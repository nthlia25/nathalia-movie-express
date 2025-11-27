import mongoose from "mongoose"
import movieModel from "../models/movieModel.js"

export const listMovie = async (req, res) => {
    try{
        const data = await movieModel.find({
            createdBy: req.user?.user_id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            movies : "List movies",
            data : data
        })
    } catch (error) {
        res.status(500).json({
            movies : error,
            data : null
        })
    }
}

export const createNewMovie = async (req, res)=>{
    try {
        const { judul, tahunRilis, sutradara } = req.body

        if (!judul || !tahunRilis || !sutradara) {
            return res.status(400).son({
                message: "Semua field (judul, tahunRilis, sutradara) wajib diisi",
                data: null
            });
        }

        const movie = await movieModel.create({judul, tahunRilis, sutradara, createdBy: req.user?.user_id});

        res.status(201).json({
            movies: "Movie berhasil dibuat",
            data: movie
        })

    } catch (error) {
        res.status(500).json({
            movies: error.message,
            data: null
        })
    }
}

export const detailMovie = async (req,res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID tidak valid", data: null });
        }

        const movie = await movieModel.findOne({
            _id: id,
            createdBy: req.user?.user_id,
        });

        if (!movie) {
            return res.status(404).json({ message: "Movie tidak ditemukan", data: null });
        }

        return res.status(200).json({ message: "Detail movie", data: movie });

    } catch (error) {
        return res.status(500).json({
            message: "terjadi kesalahan pada server",
            error: error.message,
            data: null,
        });
    };
}

export const updateMovie = async (req, res) => {
    try{
        const { id } = req.params?.id
        const { judul, tahunRilis, sutradara} = req.body;

        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                movies : "Id wajib di isi",
                data : null
            })
        }

        const updateMovie = await movieModel.findOneAndUpdate(
            {
                _id: id,
                createdBy: req.user?.user_id,
            },
            {judul, tahunRilis, sutradara},
            {new: true},
        );

        if (!updateMovie) {
            return res.status(400).json({
                message: "Movie tidak ditemukan atau akses ditolak",
                data: null
            })
        }

        return res.status(200).json({
            movies : "Movie berhasil diupdate",
            data : null
        })      

    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            movies : error,
            data : null
        })
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params.id

        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message : "Id wajib di isi",
                data : null
            })
        }

        const deleteMovie = await movieModel.findByIdAndDelete({
            _id: id,
            createdBy: req.user?.user_id,
        });

        if(!deleteMovie){
            return res.status(404).json({
                message : "Movie tidak ditemukan atau akses ditolak",
                data : null
            })
        }

        return res.status(200).json({
            movies : "Berhasil menghapus movie",
            data : null
        })
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error : error,message,
            data : null
        })
    }
}