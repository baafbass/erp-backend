const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const birimRoutes = require('./routes/kontrolT/birim.routes');
const dilRoutes = require('./routes/kontrolT/dil.routes');
const firmaRoutes = require('./routes/kontrolT/firma.routes');
const isMerkeziRoutes = require('./routes/kontrolT/isMerkezi.routes');
const maliyetMerkeziRoutes = require('./routes/KontrolT/maliyetMerkezi.routes');
const malzemeRoutes = require('./routes/kontrolT/malzeme.routes');
const operasyonRoutes = require('./routes/kontrolT/operasyon.routes');
const rotaRoutes = require('./routes/kontrolT/rota.routes');
const sehirRoutes = require('./routes/kontrolT/sehir.routes');
const ulkeRoutes = require('./routes/kontrolT/ulke.routes');
const urunAgaciRoutes = require('./routes/kontrolT/urunAgaci.routes');

const malzemeBilgileriRoutes = require('./routes/MalzemeBilgileri/malzemeBilgileri.routes');
const maliyetMerkezleriRoutes = require('./routes/MaliyetMerkezleri/maliyetMerkezleri.routes');
const isMerkezleriRoutes = require('./routes/IsMerkezleri/isMerkezleri.routes')

const urunAgaciHeadRoutes = require('./routes/UrunAgacilari/urunAgaciHead.routes');
const urunAgaciContentRoutes = require('./routes/UrunAgacilari/urunAgaciContent.routes')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/birim",birimRoutes);
app.use("/api/dil",dilRoutes);
app.use("/api/firma",firmaRoutes);
app.use("/api/is-merkezi",isMerkeziRoutes);
app.use("/api/maliyet-merkezi",maliyetMerkeziRoutes);
app.use("/api/malzeme",malzemeRoutes);
app.use("/api/operasyon",operasyonRoutes);
app.use("/api/rota",rotaRoutes);
app.use("/api/sehir",sehirRoutes);
app.use("/api/ulke",ulkeRoutes);
app.use("/api/urun-agaci",urunAgaciRoutes);

app.use("/api/malzeme-bilgileri",malzemeBilgileriRoutes)
app.use("/api/maliyet-merkezleri",maliyetMerkezleriRoutes)
app.use("/api/is-merkezleri",isMerkezleriRoutes)

app.use("/api/urun-agacilari/urun-agaci-head",urunAgaciHeadRoutes);
app.use("/api/urun-agacilari/urun-agaci-content",urunAgaciContentRoutes);

app.use((req,res)=>{
	return res.status(404).json({
		message: 'Not Found',
	})
})

module.exports = app;