var Xray = require('x-ray'),
    phantom = require('x-ray-phantom');
x = Xray()/*.driver(phantom())*/,
    async = require('async'),
    cheerio = require('cheerio'),
    MongoClient = require('mongodb').MongoClient;

var noticias = [];
var urlFravega = [
    'http://www.fravega.com/audio',
    'http://www.fravega.com/camaras-y-video-camaras',
    'http://www.fravega.com/celulares',
    'http://www.fravega.com/informatica',
    'http://www.fravega.com/video-juegos',
    'http://www.fravega.com/climatizacion',
    'http://www.fravega.com/cocina',
    'http://www.fravega.com/heladeras-freezers-y-cavas',
    'http://www.fravega.com/lavado',
    'http://www.fravega.com/pequenos-electrodomesticos',
    'http://www.fravega.com/termotanques-y-calefones',
    'http://www.fravega.com/equipos-para-auto',
    'http://www.fravega.com/jugueteria-electronica',
    'http://www.fravega.com/energia',
    'http://www.fravega.com/iluminacion',
    'http://www.fravega.com/cuidado-del-bebe'];

var urlsGarbarino = ['https://www.garbarino.com/productos/tv-led-y-smart-tv/4342',
    'https://www.garbarino.com/productos/streaming-y-reproductores-multimedia/4699',
    'https://www.garbarino.com/productos/reproductores-dvd-y-blu-ray/4344',
    'https://www.garbarino.com/productos/accesorios/4534',
    'https://www.garbarino.com/productos/notebooks/4363',
    'https://www.garbarino.com/productos/tablets/4364',
    'https://www.garbarino.com/productos/impresoras/4367',
    'https://www.garbarino.com/productos/computadoras-de-escritorio/4365',
    'https://www.garbarino.com/productos/informatica/4362',
    'https://www.garbarino.com/productos/celulares-libres/4359',
    'https://www.garbarino.com/productos/telefonos-fijos-y-fax/4360',
    'https://www.garbarino.com/productos/audio-para-autos/5087',
    'https://www.garbarino.com/productos/equipos-de-musica/4346',
    'https://www.garbarino.com/productos/auriculares/4349',
    'https://www.garbarino.com/productos/home-theatre/4347',
    'https://www.garbarino.com/productos/audio/4345',
    'https://www.garbarino.com/productos/juegos-de-consola/4373',
    'https://www.garbarino.com/productos/consolas/4372',
    'https://www.garbarino.com/productos/joysticks/4375',
    'https://www.garbarino.com/productos/accesorios/4374',
    'https://www.garbarino.com/productos/camaras-digitales/4356',
    'https://www.garbarino.com/productos/video-camaras/4355',
    'https://www.garbarino.com/productos/camaras-deportivas/4504',
    'https://www.garbarino.com/productos/accesorios/4357',
    'https://www.garbarino.com/productos/almacenamiento/4937',
    'https://www.garbarino.com/productos/accesorios-para-celulares-y-tablets/4361',
    'https://www.garbarino.com/productos/insumos/4819',
    'https://www.garbarino.com/productos/accesorios-computacion/4542',
    'https://www.garbarino.com/productos/tv-led-y-smart-tv/4274',
    'https://www.garbarino.com/productos/streaming-y-reproductores-multimedia/5011',
    'https://www.garbarino.com/productos/reproductores-dvd-y-blu-ray/4276',
    'https://www.garbarino.com/productos/accesorios/4528',
    'https://www.garbarino.com/productos/aires-acondicionados-split/4278',
    'https://www.garbarino.com/productos/aires-ventana-y-portatiles/4564',
    'https://www.garbarino.com/productos/ventiladores/4280',
    'https://www.garbarino.com/productos/calefaccion-electrica/4484',
    'https://www.garbarino.com/productos/ventilacion-y-calefaccion/4277',
    'https://www.garbarino.com/productos/cafeteras/4306',
    'https://www.garbarino.com/productos/pavas-electricas/4312',
    'https://www.garbarino.com/productos/mixers/4317',
    'https://www.garbarino.com/productos/procesadoras/4307',
    'https://www.garbarino.com/productos/pequenos-electrodomesticos/4305',
    'https://www.garbarino.com/productos/lavarropas/4298',
    'https://www.garbarino.com/productos/secarropas/4301',
    'https://www.garbarino.com/productos/lavavajillas/4302',
    'https://www.garbarino.com/productos/lavasecarropas/4300',
    'https://www.garbarino.com/productos/lavado/4297',
    'https://www.garbarino.com/productos/microondas/4285',
    'https://www.garbarino.com/productos/cocinas/4282',
    'https://www.garbarino.com/productos/hornos/4283',
    'https://www.garbarino.com/productos/anafes/4286',
    'https://www.garbarino.com/productos/cocinas-y-hornos/4281',
    'https://www.garbarino.com/productos/heladeras-con-freezer/4296',
    'https://www.garbarino.com/productos/heladeras-sin-freezer/4291',
    'https://www.garbarino.com/productos/cavas/4294',
    'https://www.garbarino.com/productos/freezers/4292',
    'https://www.garbarino.com/productos/heladeras-y-freezers/4290',
    'https://www.garbarino.com/productos/limpiadores-a-vapor/4950',
    'https://www.garbarino.com/productos/aspiradoras/4323',
    'https://www.garbarino.com/productos/planchas/4326',
    'https://www.garbarino.com/productos/maquinas-de-coser/4327',
    'https://www.garbarino.com/productos/hogar-y-limpieza/4322',
    'https://www.garbarino.com/productos/depiladoras/4329',
    'https://www.garbarino.com/productos/planchitas-de-pelo/4330',
    'https://www.garbarino.com/productos/cortadoras-de-pelo/4331',
    'https://www.garbarino.com/productos/afeitadoras/4332',
    'https://www.garbarino.com/productos/cuidado-personal/4328',
    'https://www.garbarino.com/productos/nebulizador/4337',
    'https://www.garbarino.com/productos/tensiometro/4338',
    'https://www.garbarino.com/productos/muebles-para-cocina/4212',
    'https://www.garbarino.com/productos/muebles-para-dormitorio/4210',
    'https://www.garbarino.com/productos/muebles-para-living-y-comedor/4209',
    'https://www.garbarino.com/productos/organizadores/4817',
    'https://www.garbarino.com/productos/muebles/4208',
    'https://www.garbarino.com/productos/ropa-de-cama/4791',
    'https://www.garbarino.com/productos/colchones-y-sommiers/4215',
    'https://www.garbarino.com/productos/almohadas/4218',
    'https://www.garbarino.com/productos/muebles-para-dormitorio/4220',
    'https://www.garbarino.com/productos/baterias-de-cocina-sartenes-y-ollas/4835',
    'https://www.garbarino.com/productos/cestos-y-organizadores/5180',
    'https://www.garbarino.com/productos/frascos-y-recipientes/5186',
    'https://www.garbarino.com/productos/horno-y-reposteria/5189',
    'https://www.garbarino.com/productos/cocina/4221',
    'https://www.garbarino.com/productos/alfombras-de-bano/4954',
    'https://www.garbarino.com/productos/cestos-y-canastos/4955',
    'https://www.garbarino.com/productos/sets-de-bano/5174',
    'https://www.garbarino.com/productos/toallas-y-toallones/4862',
    'https://www.garbarino.com/productos/bano/4239',
    'https://www.garbarino.com/productos/accesorios-de-jardin/4739',
    'https://www.garbarino.com/productos/piletas-y-piscinas/4247',
    'https://www.garbarino.com/productos/parrillas/4246',
    'https://www.garbarino.com/productos/muebles-de-jardin/4248',
    'https://www.garbarino.com/productos/cestos-y-canastos/4879',
    'https://www.garbarino.com/productos/limpieza-del-hogar/4878',
    'https://www.garbarino.com/productos/organizacion-del-hogar/4881',
    'https://www.garbarino.com/productos/planchado-y-tendederos/4877',
    'https://www.garbarino.com/productos/termotanques/4250',
    'https://www.garbarino.com/productos/calefones/4251',
    'https://www.garbarino.com/productos/adornos/5000',
    'https://www.garbarino.com/productos/almohadones/4983',
    'https://www.garbarino.com/productos/carteles-y-vinilos-decorativos/4985',
    'https://www.garbarino.com/productos/cuadros-y-portarretratos/4951',
    'https://www.garbarino.com/productos/deco-del-hogar/4260',
    'https://www.garbarino.com/productos/hidrolavadoras/4882',
    'https://www.garbarino.com/productos/herramientas/4255',
    'https://www.garbarino.com/productos/luces-de-emergencia/4660',
    'https://www.garbarino.com/productos/interior/4253',
    'https://www.garbarino.com/productos/exterior/4254',
    'https://www.garbarino.com/productos/relojes/4892',
    'https://www.garbarino.com/productos/afeitadoras/4461',
    'https://www.garbarino.com/productos/cortadoras-de-pelo/4462',
    'https://www.garbarino.com/productos/perfumes-y-fragancias/4457',
    'https://www.garbarino.com/productos/depiladoras/4454',
    'https://www.garbarino.com/productos/planchitas-de-pelo/4447',
    'https://www.garbarino.com/productos/secadores-de-pelo/4448',
    'https://www.garbarino.com/productos/balanzas-de-bano/4452',
    'https://www.garbarino.com/productos/masajeadores/4470',
    'https://www.garbarino.com/productos/nebulizadores/4467',
    'https://www.garbarino.com/productos/ninas/4383',
    'https://www.garbarino.com/productos/ninos/4384',
    'https://www.garbarino.com/productos/piletas-y-jardin/4387',
    'https://www.garbarino.com/productos/cochecitos-cunas-y-butacas/4865',
    'https://www.garbarino.com/productos/alimentacion-y-sillitas/4573',
    'https://www.garbarino.com/productos/juguetes-para-bebes/4398',
    'https://www.garbarino.com/productos/seguridad-y-salud-para-bebes/4576',
    'https://www.garbarino.com/productos/bebes/4397',
    'https://www.garbarino.com/productos/bicicletas-bmx/4890',
    'https://www.garbarino.com/productos/bicicletas-mountain-bike/4888',
    'https://www.garbarino.com/productos/bicicletas-de-paseo/4887',
    'https://www.garbarino.com/productos/bicicletas-para-ninos/4889',
    'https://www.garbarino.com/productos/bicicletas-fijas-y-spinning/4439',
    'https://www.garbarino.com/productos/elipticos/4438',
    'https://www.garbarino.com/productos/cintas-para-correr/4437',
    'https://www.garbarino.com/productos/accesorios-de-fitness/4445',
    'https://www.garbarino.com/productos/fitness/4436',
    'https://www.garbarino.com/productos/rollers/4428',
    'https://www.garbarino.com/productos/triciclos/4426',
    'https://www.garbarino.com/productos/skates-longboards/4429',
    'https://www.garbarino.com/productos/termos-y-vasos-termicos/5010',
    'https://www.garbarino.com/productos/carpas/4434',
    'https://www.garbarino.com/productos/accesorios-de-camping/4632',
    'https://www.garbarino.com/productos/colchones-y-colchonetas/4631',
    'https://www.garbarino.com/productos/neumaticos/5074',
    'https://www.garbarino.com/productos/herramientas-para-autos/4907',
    'https://www.garbarino.com/productos/audio-para-autos/4905',
    'https://www.garbarino.com/productos/accesorios-para-auto/5080',
    'https://www.garbarino.com/productos/accesorios-para-vehiculos/4904',
    'https://www.garbarino.com/productos/calculadoras/5045',
    'https://www.garbarino.com/productos/carpetas/5046',
    'https://www.garbarino.com/productos/cuadernos/5044',
    'https://www.garbarino.com/productos/bolsos/4626',
    'https://www.garbarino.com/productos/valijas/4625',
    'https://www.garbarino.com/productos/mochilas/4433',
    'https://www.garbarino.com/productos/capsulas-de-cafe/4568',
    'https://www.garbarino.com/productos/guitarras/4628',
    'https://www.garbarino.com/productos/camaras/4701'];

function fravega() {
    async.each(urlFravega, function (url) {
        x(url, {
            categories: ['.shelf li ']
        })(function (err, obj) {
            if (err) {
                callback(err);
            }
            else {
                console.log(obj);
            }
        });
    }, function (err, data) {

    });
}



function garbarino() {
    async.each(urlsGarbarino, function (url) {
        x(url, {
            productos: x('.gb-product-list-item',[{
                title: '.gb-product-list-item-title',
                link: 'a@href',
                precio: '.gb-product-list-item-prices-current'
            }]) 
        })(function (err, obj) {
            var $ = cheerio.load(obj.categories);

            if (err) {
                callback(err);
            }
            else {
                console.log(obj);
            }
        });
    }, function (err, data) {

    });
}


garbarino();