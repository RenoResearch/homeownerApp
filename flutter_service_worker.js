'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "ee8d05e0547d1605d9b230e94fc3fee5",
"version.json": "3a016abf9c447be19d5727781ff8bd47",
"index.html": "f2fd964aa14b9b4b190fdac3d28eaab9",
"/": "f2fd964aa14b9b4b190fdac3d28eaab9",
"main.dart.js": "3e894a2a5a3b7b0cb53464de51755731",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"README.md": "ead6a523570724267f3f52ab265fdc3f",
"favicon.png": "f2739d8318e2229ebc241020804e09f9",
"icons/Icon-192.png": "7b9b267a7995e29f16dd79eab8abb29b",
"icons/Icon-maskable-192.png": "7b9b267a7995e29f16dd79eab8abb29b",
"icons/logo.png": "d019da8693da1975ff22576de6c5b3a5",
"icons/Icon-maskable-512.png": "a9415c0c90d4471c4e254d399e9852dc",
"icons/Icon-512.png": "a9415c0c90d4471c4e254d399e9852dc",
"manifest.json": "67d089e05b11a75c9f98947fbdd42e6a",
".git/config": "d911df7fe28a4da03f418a7c3cfbde8c",
".git/objects/95/685e171b5edffdb50a36b9b1c899edb67f9388": "dab304fac6b7a45fbcd10b4f388d4c87",
".git/objects/59/4a70324400726b2639c6038fd89af14d48facb": "a165b9735227f66f23c631ff949125fd",
".git/objects/0c/a0d9efa7cfaab14ab87fa99f7d214e1a081b7a": "f78017fba6525a67c1ed07caf4bb78b1",
".git/objects/66/1739d01f96d57f7044c78491eb9ab50cb468cd": "b03adc8dba9e2c5d958f031b421dbaa5",
".git/objects/50/71481d3f46d5e5dc235f633ca92147b4b6952b": "030a82e8ffd42ab83f6150c83f361947",
".git/objects/57/7946daf6467a3f0a883583abfb8f1e57c86b54": "846aff8094feabe0db132052fd10f62a",
".git/objects/3b/b0860a0981211a1ab11fced3e6dad7e9bc1834": "3f00fdcdb1bb283f5ce8fd548f00af7b",
".git/objects/03/2fe904174b32b7135766696dd37e9a95c1b4fd": "80ba3eb567ab1b2327a13096a62dd17e",
".git/objects/9b/00ad07fc4c12154499447019277095a02e7ef3": "aa586460b6d3c5b779192769e4d8b3ca",
".git/objects/6a/a3a20c05c364d25ef3b11c4df0e12342db08d8": "88b31a8c5deae5348051a8b5586ada9d",
".git/objects/35/96d08a5b8c249a9ff1eb36682aee2a23e61bac": "e931dda039902c600d4ba7d954ff090f",
".git/objects/3c/dac1c49ef0db883d59760c041cb14e38a91891": "f404f93be8200f4521f7ee00bc5f1dc6",
".git/objects/3c/4852d68f1a10e027d1ee6ff52a7be27565a81e": "271c56394bbf12b41f3b71dd3d10ef18",
".git/objects/51/27d7246bb04678c391a67e17755683068f765d": "8c8ca27484f5cd1e9ef9b9e535a63c99",
".git/objects/34/9d03d2a170c87deb3b48bf53c8e425cafcbcc6": "bbef602053f2d681c7407041685127f6",
".git/objects/5f/bf1f5ee49ba64ffa8e24e19c0231e22add1631": "f19d414bb2afb15ab9eb762fd11311d6",
".git/objects/33/e7142007cb4d06c4a4a287d45ca66501e9ea8e": "9d2d27fa039c4caf1e51f41624e4ea43",
".git/objects/05/df88e461fbd9a2ccd1a40cd93a8af5c9a15a73": "953f775fc31d548310ebec42c94bb8ee",
".git/objects/9c/e04ac3901b662e71ef69cc31b6cbcc09b10499": "7d37d61eac85fed17a44041689cf9367",
".git/objects/a3/5b86f42d8fcf7b8b1b979f41193bbc564fe121": "8b27f60ea30811d8759ae5690f23cd31",
".git/objects/d9/3952e90f26e65356f31c60fc394efb26313167": "1401847c6f090e48e83740a00be1c303",
".git/objects/ac/6f5fd25a70da7f3111d96b4aa3e57d0bfb5fc2": "caceff574159106ff1df924255467d44",
".git/objects/b3/76b92a0738ea10ea1946bfd05a12e08189838c": "3c81b17838b976327c81543af5379a9b",
".git/objects/da/83582c0d7438e5b976511afd5c6a4dd9d7f518": "327ed281c214e5ecc5661763d3343e3b",
".git/objects/b4/1877dd9c3fb38808791486fb59166a7f92f99e": "aa5ad463667d0a445ebdddc79cadeaec",
".git/objects/a5/54a624d02c083c16b7c536debec4d4305fc7f0": "bef2d8fd7cff55021071c9e62610a2de",
".git/objects/a5/de584f4d25ef8aace1c5a0c190c3b31639895b": "9fbbb0db1824af504c56e5d959e1cdff",
".git/objects/bd/6be43d015a2a8a92db341ee519feb383a20cb4": "0df4c80430aff6e9b0cdd970bc215545",
".git/objects/d6/54c44be768aedcfd600d192ec528f19c142fb8": "1f98de0c23bede5eed31dca0b94d0c4a",
".git/objects/d6/a14e44cb3f6c4c6ab7f7cc28880621470853c4": "b341f1cd43c1abd6917f719ad79aee79",
".git/objects/ab/ac547cb1de39fd4a58fd96c10d585b768aa9f9": "a047f9d7890b320b731be825a335934e",
".git/objects/ab/ce6a7d74c410ffe54aacdb4341bf759e8e5332": "ad4b28b67d2f28552ecfc591c60ce894",
".git/objects/e2/1e9041a7a469faae572400d5cfaa93e7e530b8": "edcb94229e88d9a57494a64dab84287d",
".git/objects/e2/58c388659a0b1bfbc164ba92888431c10dcd46": "d38dc7ed174353d1e192ea86e9ca6490",
".git/objects/f4/04d3bef4b88c0e091ce4b1e09172e67f7ba6cb": "4f6a67bf11e8219b8eae8b162a79ec46",
".git/objects/f4/fcd6a2f47a57f00d5116d38b0faa5eddab291c": "7c2e0be7eeb2668037182badacdd6079",
".git/objects/f3/89fb498a4f4640f542602f45b54a6cdd5ca646": "58a2c7e34f5dd3baf555b49d9d19fae8",
".git/objects/f3/709a83aedf1f03d6e04459831b12355a9b9ef1": "538d2edfa707ca92ed0b867d6c3903d1",
".git/objects/c7/7663172ca915a99a594ca17d06f527db05657d": "6335b074b18eb4ebe51f3a2c609a6ecc",
".git/objects/c0/2141d41252183847e99f6f7e7149d1d020ce27": "4315f6e99246ac1a8b6710143c2a65ab",
".git/objects/fd/c07d87ce77b0ff99c7a635bacfb8865e4c3832": "f79b663ee98735da9dd2d446fdf9278a",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f5/7126fac7c21b16843a4e7bd73a2c5af74da149": "0638d063df2af8afa164da4d2516f296",
".git/objects/e3/54af0309cb4d9be2d14952bb786eba0cf2da9e": "84fedcc89ad30c80bf3074e3ebf313a2",
".git/objects/cf/a00c4a8f0e12a2acfd85ac76f49a6a74f73d31": "adf63b00b1cc0faa064bf4c1932416db",
".git/objects/ca/6257bed4b06a449b643ecdc0af41f5d658b6b6": "0328a458bb05cbc9d8906f85b99bb0de",
".git/objects/fb/b0b2c0973f1d856de71c98fc03f17aa10e60c5": "ce9d0a4ffc0a0ce44aff83cbb46aee14",
".git/objects/c6/652f85691f7b1cafed40cb401bd5d5eca701ef": "1dea5b343e02c2e909b3f28744186a5a",
".git/objects/18/67eb5be68be7f3dcfa070deb15807703addcaa": "11e053648a3b1f1c30ec338c3dbf78e0",
".git/objects/29/9058ea34279f4af5fa3fd011ab4f79a3a220b3": "60f3074ccf01292720df8c1846c435cb",
".git/objects/45/aae7a2db369d1022fed0c6d753468ff61e1a0f": "c2c7c72c464aa690210f6a2f225634cf",
".git/objects/73/a2b0d39b299bdbe64b23c65a3d37334fa4696f": "d7631e1cc83d9f87f1d93924b4c92931",
".git/objects/17/b4071d59956b2057231887b4653162845fe91f": "c09624a0da82eb61da1110dfffa8230a",
".git/objects/7b/50902afaf1be3e510d6e425d370347e9895937": "a28f29df956beb4e61e515ebf8e56176",
".git/objects/8a/51a9b155d31c44b148d7e287fc2872e0cafd42": "9f785032380d7569e69b3d17172f64e8",
".git/objects/10/50f15e778d9cef53866672232e7bcb67e946f7": "6fac20590d44376875ff8869eae7d196",
".git/objects/19/404d58998d8ca3822371b2987d0b47a660e56b": "40abf8cac57bd54dc7224df4f0775a4d",
".git/objects/19/0359ab8813de4ee06e0d7aa3c68c8f9512e009": "b92ff9609afe6ffb924bbff92f1b3569",
".git/objects/4d/6b22100ba42821b9fee9d00411e0ae4fbeecca": "31a5bc5419430bad383eac617f338960",
".git/objects/75/d01afe2ef9e7d193b950705c00dac797994db2": "b9be0337bdeb956694f7d06d08ba3934",
".git/objects/72/c9d2628c4830c78271d634b5a7492ea33187e0": "d3018a44f34bbae9f0c66d9f94df6798",
".git/objects/44/0473d6d81f31f8b4a33abba22d02eebb85ebba": "e5820f59dda082ef9b350c7286a8f03e",
".git/objects/2f/00e264057368d9b145c0de813c3104194e13d0": "494a5c17964cc3337cddebd77e3c2d26",
".git/objects/43/30b4b1c46762d65d0574e0d54aac42b404d457": "a0f0b2d5b24bba935a42b006d5204b91",
".git/objects/43/7dd87b8bf4015172ad243f7d57de32b740935a": "f52a0feb05ca1c667d78b90df605128b",
".git/objects/6b/c9259a312595ef0e0308c3368cb889af54a26c": "25be68bf7ee26d29c930736bd32f1b91",
".git/objects/07/b337d14c957ed8260c7643ecd5276ad8e06816": "a99e11075cb460672e55c7356a6d72da",
".git/objects/9a/4c927abe90f8d73f96726d775637631a6850c8": "feb128e8b70ceb9a8eecb485955ce053",
".git/objects/9a/7b9dd0a64cb638581700ecbfc8ebc70b654469": "7a8a154f068fceb416632aec24532bac",
".git/objects/36/7963fd4bd3fde5173e83462049d000d74594d1": "07347b854cb1c67f01ff64e2fad9fe6b",
".git/objects/31/c9efa981bee7ea2782a40af8d5172858bcc403": "26b004b9a047445267941ca538f5d0b2",
".git/objects/91/4a40ccb508c126fa995820d01ea15c69bb95f7": "8963a99a625c47f6cd41ba314ebd2488",
".git/objects/3a/bf18c41c58c933308c244a875bf383856e103e": "30790d31a35e3622fd7b3849c9bf1894",
".git/objects/3f/9cdc114fc8ac79bc42bf3933550f15f5b7101c": "1fe11e38a964c1f9c1623931cef4d27c",
".git/objects/5b/bfc832a2c3a9ecb939bd6e608c7597ec4c104a": "bffb796fdb87bee67cd086a6cff3f2d9",
".git/objects/08/2e77331851e6ada7fd9c139b2c0f72eee0215b": "f1e5fef9e154561ef554bd9422299d68",
".git/objects/06/5a156ad876ae75d08bca0aabc8c1e01f285abb": "1338ac20d12542d14345378e2fe2be26",
".git/objects/06/adff76193941532fd736f92bc333ac8c4b963c": "45a7677a1c097915c100ebd126807f71",
".git/objects/6c/e499da6b2a188194ed50b44b12d45d3d525a38": "3288d4f4619406002fc0e781979a51d4",
".git/objects/99/59093aefb212234415e51839525f89f1775ef8": "dec71f6b218cf28dbcba8b5c2e165416",
".git/objects/97/fa321bfa6fdfb70653114cc4f0fec11ce2c86d": "10777a557d96948c64eee8556282a3b2",
".git/objects/64/c9d4daef7c5b9cbde9f5824ef9e389470e9559": "515fcc9cb4d53bff1f9c2c5e3f740d9f",
".git/objects/64/0d035192205109577b3bae6e563ab3b7e2b17b": "ac94f7da6a21beb372bdbfc08cb17153",
".git/objects/64/028c67c474bc4df369f660c837ed6fe7a86ba4": "f17b7d56f0d50dde3bfeb3f1b42d1a11",
".git/objects/bf/e2360951661d4de1e4b30e41ba064fc44244bb": "03c3fb5b65ee93965a4fbcb9094926a7",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/b8/2cdcd17f913de40d51e92f74022a4c1c71ab23": "b4b3ca929fbd65905ddbab1ff0043d8e",
".git/objects/b1/600de46a0541cfb9dddbf6e87a0d8506683109": "157a732bdc0df6c156b8ab96e6e90968",
".git/objects/dc/9be163bca9b5b64515a3b35a6bc20103805807": "7e2b42579c1c0ce2a4c541b19b0b1893",
".git/objects/dc/f83695f71da8c6278eb914cdd42692c427924e": "9ca7f32e12839dea4610032ada023058",
".git/objects/dc/8e81d69bc0aac243a4ca1a8523b2d2af0140db": "9563c9563080002e3de8014fc4cddaa5",
".git/objects/b6/8a2f6a6362ba2a387a8d5abb7fd364b7d299a1": "10b1750f4f0bf50ee256fcc2bbc34410",
".git/objects/a9/86919f759fb918f0cd4dce26ae1c0b99741556": "a112aecb8326524a5442d3975562ff51",
".git/objects/d2/e8a2ee9c148598a56766e7563dd8f8b0c32fbd": "c5156cc514688283c50b7cda332d9d3b",
".git/objects/aa/5caf65601a5520979ea95937cf84ed3d489dfb": "79c49c40f2aa8f5e00c7e63f2864b2b3",
".git/objects/aa/77863a6e975d822d6bc2b9deda945525097223": "0f87f1c78892b12c2819fae67e25d0bf",
".git/objects/a8/8c9340e408fca6e68e2d6cd8363dccc2bd8642": "11e9d76ebfeb0c92c8dff256819c0796",
".git/objects/b0/9d1b0562ceb5e157d18ad31c951c260edffa65": "11b01bde5780248245f97ca6c1922c92",
".git/objects/a1/50cea8cb41bc223ea869018d0eeb5a05a7d214": "acf2e247206d4b3f9d84061731e63fd3",
".git/objects/ef/b875788e4094f6091d9caa43e35c77640aaf21": "27e32738aea45acd66b98d36fc9fc9e0",
".git/objects/c3/a13d7a1f5409867da26cbe04a44c6dc974c1c0": "8332fda277ff2ffa5982aad921564341",
".git/objects/c3/cf564c223d3752ae505c306aba1f67f1c5b8f0": "6291ac390a34a4425c48b145a454d252",
".git/objects/cd/c34d73d1fac68d3ce985a366b70e41555f90bb": "c7b7985eb0860eca21547e961bc1cd9d",
".git/objects/f9/5259b428f0dc85e1bdf3328fbfed6b5d0fae0e": "58544df4358406d0f08f838bb7520504",
".git/objects/f7/05e50f33ef377266b6f2f62e5b78272a25d4f3": "69e876c2e24c5ef5b3febee85fc1c34c",
".git/objects/fa/d3530e0031a670c5461866056f80339333a1f1": "433e576a7d0807324e529c03d88f6409",
".git/objects/ff/437efd16e846cc42643175e607efa24835631a": "8cad5a82807ada3824f7166eeec06033",
".git/objects/ff/d719a41a88d2718d7777089e8f42b7d4350f75": "ca49dbea52bcbe03fc9ad9c10c255748",
".git/objects/c2/6b30bc4ca96054449fa40d593346e39f8ecc0a": "c1cfc216339fdfeaacd22d93eda77b2e",
".git/objects/e7/c5ea418415ae489d5fb3f8369510c22b89311f": "6587c3f8b7132a5fee92112234ec01cc",
".git/objects/ce/22f229e12b2ea80ed01ff2916249ee01151797": "315e46a4b12092a77f4a758f3741913d",
".git/objects/2c/1cad38d0b34613a313f0a13c3111a0164a0714": "ed5dae1749c66dddf5fc0fee51da0de0",
".git/objects/2d/0471ef9f12c9641643e7de6ebf25c440812b41": "d92fd35a211d5e9c566342a07818e99e",
".git/objects/41/b36094658e6620ca073311a1b85426d7b327a3": "263ed0ce0da8cf8f2eb030e7fe1b43b4",
".git/objects/83/283caa03051bde5b2e3ada8ce32923ebf3c2dd": "a2e2f2d264c3b0dbdcba84c44b4efafb",
".git/objects/83/f9ff8f104f1cdc05ad5270c998c5087aa58c09": "c95afd28e0aab45f8ec3567c1457c10c",
".git/objects/1b/c9a53c9c4eb4bff23756d9c1a263ab787b3278": "cb80035bfd0794d1ef1b3dae1971552b",
".git/objects/1b/0b0ade67335979efdacfb93313243dbc0d8cf1": "8b7ba491e342aa64e1af9afd93e2e24b",
".git/objects/1e/b095b4cbecf35214a9dc1f0abaa563749c4a59": "2cd8baa8f3e650ab841ee0c6621c7d31",
".git/objects/84/0c12bb5b26175aae8c109b88dc8c5831a65f86": "595300d06740f1f74b54ae3ee4e5bb56",
".git/objects/4a/c4b1fc2bfed6daf59c957f44cc615c4816ec1d": "1a3f3cf9bcf48d7350b7e61cd6da9be1",
".git/objects/24/1484d905e18c37f64deba957116268253f8bfb": "f8e94e95a18e79003a8cd3f9b3ac6636",
".git/objects/4f/02e9875cb698379e68a23ba5d25625e0e2e4bc": "254bc336602c9480c293f5f1c64bb4c7",
".git/objects/8d/54df958a1cdbf8e908bbc47cf247de7e46464b": "5ac2701ffa0d0f5bec733538b5964afc",
".git/objects/8c/e09970b498e8d511d5bf4db7a47da41b17182b": "64c7de22b876532ea8bab8ca130d23d0",
".git/objects/8c/4507c42076ef5bd440f41ff6b8a694bd0b9f77": "b5748e18e22b45e02e0d34f4b0b68c63",
".git/objects/76/1d6846e75d506956eefb6e4b071187dccc26b7": "6b7b4258f828c04895199e5b08f5017d",
".git/objects/76/97765466d87c0b5277ec2145d6d2e4ef07e79c": "1a79d3537867925f5d8a8a9e77ca87f6",
".git/objects/49/7cddb44178a959ac50a202c0a3e4a0985e07b3": "8b3c16a4fb741fe73278e5c76d429b55",
".git/objects/40/1184f2840fcfb39ffde5f2f82fe5957c37d6fa": "1ea653b99fd29cd15fcc068857a1dbb2",
".git/objects/78/64a9a6868a25e234e5a3777012ff9bc8977067": "f4e9c2adf960a7cf3babad47c6507994",
".git/objects/14/e0b142380a39835c9852cf6f1fb6a5cef4e8cf": "929fc6296a36bdc37efba873145afaea",
".git/objects/8e/1cbdcff3fa8bb1f185122503b9d0d4c60efec9": "8c7caf479f4f2727c41c6deff52cab92",
".git/objects/25/f84a12b119d80c1b2405c9f7587bbaaec171be": "5287c83e9989a3058fdb1fbda310b00d",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "b3f68db1c3ad9cd1987386d983ded99e",
".git/logs/refs/heads/main": "625d22d05b5a4f49fb16c319866beff5",
".git/logs/refs/remotes/origin/main": "dd2ffa6b07808b5d9fd4a6d06f7e5c94",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/main": "91f23d8ab50fefb8a84a7ef0086402d0",
".git/refs/remotes/origin/main": "91f23d8ab50fefb8a84a7ef0086402d0",
".git/index": "d33174bf5c957aabadfc1b360e93c566",
".git/COMMIT_EDITMSG": "e41b57ed9472981f640a4158d5beb3e4",
"assets/AssetManifest.json": "42d33b762ab6c9cb12d2f87a23ea58f1",
"assets/env.json": "bc67ded42e8ac8fda5d97f263910362b",
"assets/NOTICES": "7dabffff99d5667d06e40873ce352bc8",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/AssetManifest.bin.json": "b6847bbce039655c706f663c973d64b1",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "754afa7fa62f37e4ba6c73ee4553901b",
"assets/fonts/MaterialIcons-Regular.otf": "767463009cfd1cc5a208cff9880daa5b",
"assets/assets/images/Shared.png": "2a447174b3bb2a762625973af5087d62",
"assets/assets/images/Onboarding_screen_1.png": "db9a9f1fe1a4d5582c383614e4b5aeb7",
"assets/assets/images/Wishlist.png": "216d6db076422f8953bd3a2675ea45db",
"assets/assets/images/atoggle.png": "7deb862c0d9848321f1f25e1076f53cf",
"assets/assets/images/team.png": "9dab0785ad38bdebb58101e152a67fa2",
"assets/assets/images/Content_Switcher_Section.png": "54144d2a06da1bb7395822b8ab51c93e",
"assets/assets/images/Onboarding_screen_2.png": "6d613b9deee998eb57e8d8d76dbe4db9",
"assets/assets/images/renovation_loan.png": "89e9980c98cc447f4e8b05557103674a",
"assets/assets/images/Condo.png": "bedde1b509084dd57f7b6651fc9f95e2",
"assets/assets/images/Property_1_Firms_selected.png": "42dd848226a377f0098083856c2e3eb9",
"assets/assets/images/flexibility.png": "a2d8f12bdacb90d9d3082f7a49d3c4b3",
"assets/assets/images/Help_-_support.png": "c5d2c547a0550a672ec94fca71ead06f",
"assets/assets/images/Like_wh.png": "41f58fd3a87bdec49f1162d858dc4798",
"assets/assets/images/Onboarding_screen_3.png": "f2ce1d97ba1da62df7a851a47eabe9bc",
"assets/assets/images/Login.png": "18d4c5c35721a7828386f604a66930b1",
"assets/assets/images/Property_1_Default-3.png": "ed4b166b75a8a6234144a41198fc10cb",
"assets/assets/images/Experience.png": "5086bd55422d7c25a9e23b95b775fe14",
"assets/assets/images/keys.png": "8d68b02ecf127d8a8321a809571662c1",
"assets/assets/images/Property_1_Default-2.png": "4e922042e269e11cf460053a0e18ee7d",
"assets/assets/images/Startup-Initiate-stage-Final_1.json": "06230a6bb044f66b6be2d52ae35458db",
"assets/assets/images/network_error.png": "88ec9146490d3ae73ede396ba8a02515",
"assets/assets/images/Property_1_Default-1.png": "193997b0ee2ab5863437e8e3da80aa48",
"assets/assets/images/bfirm.png": "5abc84ed50a945140aa8e9ee6cdef65d",
"assets/assets/images/Services.png": "833061d77a4a3b4b9cfc104bece3cd51",
"assets/assets/images/Tag.png": "04268911deb319ecc66d93e33cfcb99d",
"assets/assets/images/subway_file-10.png": "cad88075159e24b481e86404c4863c0e",
"assets/assets/images/Others.png": "46c576c83631b773283069c4042659f7",
"assets/assets/images/bonlike.png": "e50b37f4f8ad42cc03d2fd077fa21db6",
"assets/assets/images/Property_1_Office_renovation.png": "766c5101e8718e2b89cd3b5abf973d58",
"assets/assets/images/Home.png": "00790a8872404b35877c3bc19e14d462",
"assets/assets/images/Partial.png": "01ed79e1b81516945bda20e602d0a2b1",
"assets/assets/images/32b7e920-537b-4c67-ba5e-01073ef6f56d-1757660089947.jpeg": "dbdebbeefd2dd784d09e4a3c94a1261c",
"assets/assets/images/Restaurant.png": "33c9dab6b8ed1a9338efb4f36d04b3f9",
"assets/assets/images/basil_bag-solid.png": "d7828fe34a400122a196d0e348236ec7",
"assets/assets/images/onlike.png": "46d9b97ff485d9861e5662294e3c8d09",
"assets/assets/images/whatsapp_logo.png": "85becb35e8864e42a5796fd8e240fbfb",
"assets/assets/images/Help_and_support.png": "5eefa07e08ac5c9df6a8c5f62ac5ad84",
"assets/assets/images/information.png": "f689850a42a96b1e3705976361e63b3f",
"assets/assets/images/Like.png": "767e297ce3053650361653348a90b820",
"assets/assets/images/ph_buildings.png": "4662b164188cb9817002fe6620aa5fda",
"assets/assets/images/fluent_location-16-filled-2.png": "c18095332ecffcaf14bfa70f1a7d8ee8",
"assets/assets/images/Commercial.png": "def2655f366fbbe1f73e0748579d900f",
"assets/assets/images/Landed_Home.png": "e75d454f3336d18f381ca4cf1896b35d",
"assets/assets/images/Office.png": "18f66b01a60e8bf91f704ab294b3b72d",
"assets/assets/images/portfolio.png": "eb39aacd64576c2c292c38113348eed3",
"assets/assets/images/Property_1_Variant2.png": "b5dc06545f9449dfbec0470f62ef5815",
"assets/assets/images/Renovation.png": "3335745df557857edd509bbdfb876f55",
"assets/assets/images/apple_icon.png": "be00559b7ff821149abce8b2ddf4675d",
"assets/assets/images/google_logo.png": "24c22e47b7f198df14783544924f51e3",
"assets/assets/images/BTO_HDB.png": "6fb9a3ae5adf7e48b6f46758c2f03b66",
"assets/assets/images/filter.png": "55c5c70be18a2ac1fc3270145dbb7bc9",
"assets/assets/images/Timeline.png": "76ad746db78111475c6b518935b85496",
"assets/assets/images/Firms.png": "da361d925ae6e2870d110e7c5ede41dc",
"assets/assets/images/Property_1_Others.png": "46c576c83631b773283069c4042659f7",
"assets/assets/images/share.png": "dd5351531f00628d7e8941f68cc91573",
"assets/assets/images/Profile.png": "e7d098ac35529cf0a0f22833c005f202",
"assets/assets/images/location.png": "c18095332ecffcaf14bfa70f1a7d8ee8",
"assets/assets/images/logo_3_1.png": "245d7b40e10bf2f368d0c44f0c3ad089",
"assets/assets/images/Startup-Initiate-stage-Final_1.lottie": "1c172bd5c89a0c50e7540cf5fb36748f",
"assets/assets/images/design-styles.png": "25b2cbefcc6f4718f5640b056cb7263b",
"assets/assets/images/Property_1_Variant2-1.png": "53418092b56566917097c9bb8483e57d",
"assets/assets/images/Signout.png": "a36255ba748666b6605ea36812376de9",
"assets/assets/images/Reviews.png": "e1607652ce83ae57afb8f2d45fc65497",
"assets/assets/images/team-1.png": "6f955f06655a62e77471842d96333f18",
"assets/assets/images/Property_1_Restaurant_Renovation.png": "d356c0b1075741a8c1e4f31cfa8a2e2b",
"assets/assets/images/Property_1_Default.png": "28651c35b22f44a7a26309edb16bc08f",
"assets/assets/images/blike.png": "d3984f19024cff00ea92652cf76add93",
"assets/assets/images/btoggle.png": "1ba23ee3af0f47c6abaa61c0b5073a3b",
"assets/assets/images/PHOTO-2025-09-12-14-33-14-1757658826356.jpeg": "0601ef083817eb20bfcdb7fce17988f7",
"assets/assets/images/Property_1_Variant2-2.png": "4f4811c205fa48814d22a689f2318fbb",
"assets/assets/images/Resale_HDB.png": "2a7bff37ad14c6721a83d6dfdf96b6e0",
"assets/assets/images/Property_1_Variant2-3.png": "9609287cd9e6c3739d023a131e5b8cab",
"assets/assets/images/arrow-up-right.png": "49447e78ebd925cb9cf50eeacdc2af70",
"assets/assets/images/google.png": "a79a9aae3b436acf524cbbd96c9cf186",
"assets/assets/images/Order_wh.png": "48b2c4edc4d5c1edbce4d75c61274aff",
"assets/assets/images/IMG_1961-1757564924074.jpeg": "b1f9482ac1a90156ed05de596944420e",
"assets/assets/images/Budget.png": "342169fe3b02df23df43dd5b038ae9ee",
"assets/assets/images/Googled.png": "60f727ea043b0d66e449b96dbc6da4ac",
"assets/assets/images/Images.png": "1c9afd6ed45d365711101d09462ac3ea",
"assets/assets/images/clients.png": "7f04d79396f3861b18be1e2e0473a510",
"assets/assets/images/Property_1_Commercial_renovation.png": "def2655f366fbbe1f73e0748579d900f",
"assets/assets/images/Firm.png": "4662b164188cb9817002fe6620aa5fda",
"assets/assets/images/Image.png": "ac34762f17cb92dcf23bc8ed2f3a3583",
"assets/assets/images/Orders.png": "22a0ef06e4efc171adb3f1b565c5288e",
"assets/assets/images/Firms_logo_pp.png": "f430e5a73d01dc2e10aaeb186eb8a9a1",
"assets/assets/members.json": "4a97544ef2e394c4dd7846373e8e61df",
"assets/assets/README.md": "310a970fa31389fa571855f5bf8dee2d",
"assets/assets/Member-List-Export-2025-September-17-0519.csv": "1597896dd34660a8b5b94c4794027ed3",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
