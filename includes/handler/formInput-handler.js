const express = require('express');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const formInputHandlerRouter = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

formInputHandlerRouter.post('/input-anak', async (req, res) => {
  try {
    const { namaAnak, tanggalLahir, jenisKelamin } = req.body;

    const { data, error } = await supabase.from('anak').upsert([
      {
        nama: namaAnak,
        ttl: tanggalLahir,
        kelamin: jenisKelamin,
      },
    ]);

    if (error) {
      throw error;
    }

    res.status(201).json({ message: 'Data anak berhasil disimpan', anak: data });
  } catch (error) {
    console.error('Error during anak input:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = formInputHandlerRouter;
