'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "108aca37402352c1048eb3ee3c8a4f1c",
"version.json": "c4b7b88a26ce3503f3707fd03c55e90e",
"index.html": "617a6c6620826e636c1c0781e6144712",
"/": "617a6c6620826e636c1c0781e6144712",
"main.dart.js": "b00f0b4b5b97b113d8db2d2cd1c212ce",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"favicon.png": "f2739d8318e2229ebc241020804e09f9",
"icons/Icon-192.png": "7b9b267a7995e29f16dd79eab8abb29b",
"icons/Icon-maskable-192.png": "7b9b267a7995e29f16dd79eab8abb29b",
"icons/logo.png": "d019da8693da1975ff22576de6c5b3a5",
"icons/Icon-maskable-512.png": "a9415c0c90d4471c4e254d399e9852dc",
"icons/Icon-512.png": "a9415c0c90d4471c4e254d399e9852dc",
"manifest.json": "67d089e05b11a75c9f98947fbdd42e6a",
"assets/AssetManifest.json": "9b5ac8d538374972c7c0893707212a51",
"assets/NOTICES": "aa64b89fad8c231769fe8d8920296f81",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/AssetManifest.bin.json": "3134d940d0f811aa85b71393218679a4",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "4a38dd946d0e3fc91dae3a5f0f2011d0",
"assets/fonts/MaterialIcons-Regular.otf": "ae6a3e3f702dbbecbc832ac3b798f018",
"assets/assets/images/cred.png": "86801b4850f8ebc07d24665922518dd1",
"assets/assets/images/Shared.png": "2a447174b3bb2a762625973af5087d62",
"assets/assets/images/Onboarding_screen_1.png": "db9a9f1fe1a4d5582c383614e4b5aeb7",
"assets/assets/images/Wishlist.png": "216d6db076422f8953bd3a2675ea45db",
"assets/assets/images/atoggle.png": "7deb862c0d9848321f1f25e1076f53cf",
"assets/assets/images/team.png": "9dab0785ad38bdebb58101e152a67fa2",
"assets/assets/images/gift_icon.png": "4f2edc603263c3eea77808ab321f5c48",
"assets/assets/images/Content_Switcher_Section.png": "54144d2a06da1bb7395822b8ab51c93e",
"assets/assets/images/Onboarding_screen_2.png": "6d613b9deee998eb57e8d8d76dbe4db9",
"assets/assets/images/forum.png": "c8637928c150f8dac7ed49c8f988e73b",
"assets/assets/images/task_c.png": "7adc44c881471b559bcdc6af837ad9bd",
"assets/assets/images/keys_l.png": "67264cfebabe41fc0baf549bdf9d6c6e",
"assets/assets/images/renovation_loan.png": "89e9980c98cc447f4e8b05557103674a",
"assets/assets/images/Condo.png": "bedde1b509084dd57f7b6651fc9f95e2",
"assets/assets/images/Property_1_Firms_selected.png": "42dd848226a377f0098083856c2e3eb9",
"assets/assets/images/flexibility.png": "a2d8f12bdacb90d9d3082f7a49d3c4b3",
"assets/assets/images/Help_-_support.png": "c5d2c547a0550a672ec94fca71ead06f",
"assets/assets/images/my_package.png": "4209c40d9016307fddc39949c6d3c5b3",
"assets/assets/images/Like_wh.png": "41f58fd3a87bdec49f1162d858dc4798",
"assets/assets/images/Onboarding_screen_3.png": "f2ce1d97ba1da62df7a851a47eabe9bc",
"assets/assets/images/Login.png": "18d4c5c35721a7828386f604a66930b1",
"assets/assets/images/Home_bar.png": "4625346074893471ba939926a6ab50ec",
"assets/assets/images/Property_1_Default-3.png": "ed4b166b75a8a6234144a41198fc10cb",
"assets/assets/images/cs_events.png": "ddd60e1ce5f40376d354d00b8885b232",
"assets/assets/images/Experience.png": "5086bd55422d7c25a9e23b95b775fe14",
"assets/assets/images/keys.png": "8d68b02ecf127d8a8321a809571662c1",
"assets/assets/images/Property_1_Default-2.png": "4e922042e269e11cf460053a0e18ee7d",
"assets/assets/images/Startup-Initiate-stage-Final_1.json": "06230a6bb044f66b6be2d52ae35458db",
"assets/assets/images/mlcb.png": "65c019bffd8f61228a2940a956360e22",
"assets/assets/images/network_error.png": "88ec9146490d3ae73ede396ba8a02515",
"assets/assets/images/cloud_upload.png": "10a215c7aa3f83f33db3998aabb91efd",
"assets/assets/images/ld.png": "4d37bc70de347442685e5f45c7a3fd93",
"assets/assets/images/task_s.png": "b8f702566112fa8f7d8625ae9bfe8693",
"assets/assets/images/Property_1_Default-1.png": "193997b0ee2ab5863437e8e3da80aa48",
"assets/assets/images/port_un.png": "d94cd54f0a5a992174dfae9514035733",
"assets/assets/images/sw.png": "ff64c11b212fa1bb7ed0710bcafa9aa4",
"assets/assets/images/qh.png": "141bc7282590b6b246809027c202af47",
"assets/assets/images/buddy_up.png": "344c01b03725b23030dda4c2614972a0",
"assets/assets/images/bfirm.png": "5abc84ed50a945140aa8e9ee6cdef65d",
"assets/assets/images/buddyup_c.png": "b6cb8e3dc923d9986561c6ffdb621766",
"assets/assets/images/flex.png": "4954e02671d402f762eb6005f5109d62",
"assets/assets/images/quotation.png": "37d7038033e73818ed5103f314f99f9f",
"assets/assets/images/Services.png": "833061d77a4a3b4b9cfc104bece3cd51",
"assets/assets/images/cbs.png": "65c019bffd8f61228a2940a956360e22",
"assets/assets/images/quot.png": "07a8b7515b612bd6771aa258181d1cb7",
"assets/assets/images/chats_s.png": "2c36e4f8b0863cc77f8c51bcd196163a",
"assets/assets/images/cs_forum.png": "3658991567d4dcd2425d3dd299f916ab",
"assets/assets/images/Tag.png": "04268911deb319ecc66d93e33cfcb99d",
"assets/assets/images/subway_file-10.png": "cad88075159e24b481e86404c4863c0e",
"assets/assets/images/lum2.png": "0d11efb2227b4c60316a6fd66f882acd",
"assets/assets/images/Others.png": "46c576c83631b773283069c4042659f7",
"assets/assets/images/e-commerce.png": "de9f717e881d119716270ac3869d247f",
"assets/assets/images/package_s.png": "adbfbe8d8db8c5a1e375eb1a0aa5f75a",
"assets/assets/images/bonlike.png": "e50b37f4f8ad42cc03d2fd077fa21db6",
"assets/assets/images/Property_1_Office_renovation.png": "766c5101e8718e2b89cd3b5abf973d58",
"assets/assets/images/Home.png": "00790a8872404b35877c3bc19e14d462",
"assets/assets/images/money_bag_icon.png": "ab1919b2790e94a28b2bad94561d1a2f",
"assets/assets/images/Partial.png": "01ed79e1b81516945bda20e602d0a2b1",
"assets/assets/images/32b7e920-537b-4c67-ba5e-01073ef6f56d-1757660089947.jpeg": "dbdebbeefd2dd784d09e4a3c94a1261c",
"assets/assets/images/Restaurant.png": "33c9dab6b8ed1a9338efb4f36d04b3f9",
"assets/assets/images/basil_bag-solid.png": "d7828fe34a400122a196d0e348236ec7",
"assets/assets/images/onlike.png": "46d9b97ff485d9861e5662294e3c8d09",
"assets/assets/images/whatsapp_logo.png": "85becb35e8864e42a5796fd8e240fbfb",
"assets/assets/images/Timeline_l.png": "c4b495d35adad2add0b93b30694a3a84",
"assets/assets/images/my_firms.png": "1b797ae42b9938ddce1d5599d3ce23e5",
"assets/assets/images/buddy_up_img.jpeg": "84b0b82c9a80a69fd0fa9a2bbdccce06",
"assets/assets/images/my_portfolios.png": "346278151c54cf25fdb9f8248b14898a",
"assets/assets/images/Help_and_support.png": "5eefa07e08ac5c9df6a8c5f62ac5ad84",
"assets/assets/images/information.png": "f689850a42a96b1e3705976361e63b3f",
"assets/assets/images/ikea.png": "cabba1412c52eec38a1e6fcc8f41228e",
"assets/assets/images/buddy_up_s.png": "69e38299d6fcd206bd8269e6167ef173",
"assets/assets/images/Like.png": "767e297ce3053650361653348a90b820",
"assets/assets/images/cs_quotation.png": "f08d066a78256e91e4c0e820d646d637",
"assets/assets/images/firms_un.png": "997c55b9e64d39e631797722d548678f",
"assets/assets/images/task.png": "caa781843aa41089e36a428447a0a4d3",
"assets/assets/images/mlcb_l.png": "65c019bffd8f61228a2940a956360e22",
"assets/assets/images/profile_s.png": "9412aa8b12dc05c14f325ff6b8eef40a",
"assets/assets/images/ph_buildings.png": "4662b164188cb9817002fe6620aa5fda",
"assets/assets/images/LOANS.png": "5ef9fc380c61b8aa2091417eb0ab5191",
"assets/assets/images/cbs_l.png": "65c019bffd8f61228a2940a956360e22",
"assets/assets/images/fluent_location-16-filled-2.png": "c18095332ecffcaf14bfa70f1a7d8ee8",
"assets/assets/images/homenav.png": "1f4eae1eb918dff035e30a0437310e5b",
"assets/assets/images/cs_buddy.png": "8c6425df5e06af9c49fc0c6a4075418e",
"assets/assets/images/Commercial.png": "def2655f366fbbe1f73e0748579d900f",
"assets/assets/images/e-commerce_s.png": "2697edcbd6ad37abbeaf8c51d4c773f4",
"assets/assets/images/Budget_l.png": "4920d2c11c71a646830f84bf8212ff9f",
"assets/assets/images/Landed_Home.png": "e75d454f3336d18f381ca4cf1896b35d",
"assets/assets/images/kl.png": "01a5420cdaf55830b86fa24e5cf27991",
"assets/assets/images/forum_s.png": "07703cdc2e6fa4c92921657b8ac62ab9",
"assets/assets/images/firms_s.png": "1ad950ee2d0b6b50fb8d6a600b799d5b",
"assets/assets/images/my_profile.png": "7dde44b27b692f5c0603bd7c428e5fd1",
"assets/assets/images/blogs_s.png": "dd6107f0aafda0dc697a3e2308beb31f",
"assets/assets/images/Office.png": "18f66b01a60e8bf91f704ab294b3b72d",
"assets/assets/images/portfolio.png": "eb39aacd64576c2c292c38113348eed3",
"assets/assets/images/Property_1_Variant2.png": "b5dc06545f9449dfbec0470f62ef5815",
"assets/assets/images/vou.png": "e047e80abf955a7b3c063c283909fa40",
"assets/assets/images/cs_task.png": "948af6aeabc6e753d633f1dc4f714fca",
"assets/assets/images/leads1.png": "0d1ab6fa21a9904950e029f1dd3a13f9",
"assets/assets/images/Renovation.png": "3335745df557857edd509bbdfb876f55",
"assets/assets/images/blog.png": "e43b25e035756ecdfa12746acc27adcc",
"assets/assets/images/apple_icon.png": "be00559b7ff821149abce8b2ddf4675d",
"assets/assets/images/soilboy.png": "be3787eeb817334a53456d6f26a65d4f",
"assets/assets/images/quotation_img.jpeg": "751a857d53be3d88e2a930a9cc6d7c2f",
"assets/assets/images/chats_un.png": "c4bbf31ba77a66917bfa70c26100ab08",
"assets/assets/images/google_logo.png": "24c22e47b7f198df14783544924f51e3",
"assets/assets/images/BTO_HDB.png": "6fb9a3ae5adf7e48b6f46758c2f03b66",
"assets/assets/images/filter.png": "55c5c70be18a2ac1fc3270145dbb7bc9",
"assets/assets/images/Timeline.png": "76ad746db78111475c6b518935b85496",
"assets/assets/images/Firms.png": "da361d925ae6e2870d110e7c5ede41dc",
"assets/assets/images/Property_1_Others.png": "46c576c83631b773283069c4042659f7",
"assets/assets/images/quote_c.png": "539156d58daebc41bf36dac43a4566bf",
"assets/assets/images/share.png": "dd5351531f00628d7e8941f68cc91573",
"assets/assets/images/Profile.png": "e7d098ac35529cf0a0f22833c005f202",
"assets/assets/images/my_blog.png": "8a36e949e9dc3943d93639b894633baf",
"assets/assets/images/leads2.png": "ab14f695d4e53c57931207d15b39da18",
"assets/assets/images/dr.png": "517e9434d91dda7fe05ab9a0625cf71b",
"assets/assets/images/profile_un.png": "84201d41f36ac0e92a555e227bdc8995",
"assets/assets/images/location.png": "c18095332ecffcaf14bfa70f1a7d8ee8",
"assets/assets/images/logo_3_1.png": "245d7b40e10bf2f368d0c44f0c3ad089",
"assets/assets/images/Startup-Initiate-stage-Final_1.lottie": "1c172bd5c89a0c50e7540cf5fb36748f",
"assets/assets/images/forum_c.png": "033364d7cf4aa3b37917cf2a4a00b44d",
"assets/assets/images/design-styles.png": "25b2cbefcc6f4718f5640b056cb7263b",
"assets/assets/images/blogs_un.png": "e43b25e035756ecdfa12746acc27adcc",
"assets/assets/images/loan.png": "dd1e4303c30cfca5eb1b27dd629dc725",
"assets/assets/images/Property_1_Variant2-1.png": "53418092b56566917097c9bb8483e57d",
"assets/assets/images/havells.png": "a8df66eceaaacc45787260803ac49345",
"assets/assets/images/quotation_s.png": "430357d897c4cebebb4d2e45d247ad6c",
"assets/assets/images/Signout.png": "a36255ba748666b6605ea36812376de9",
"assets/assets/images/port_s.png": "e2cbe0ee8da60003285d56989c610254",
"assets/assets/images/Reviews.png": "e1607652ce83ae57afb8f2d45fc65497",
"assets/assets/images/team-1.png": "6f955f06655a62e77471842d96333f18",
"assets/assets/images/ikea2.png": "d3643b4f3a768104d8b20b4df1af6fe9",
"assets/assets/images/accuracy_icon.png": "310f007f4c016811d0cd48578c4015dc",
"assets/assets/images/Property_1_Restaurant_Renovation.png": "d356c0b1075741a8c1e4f31cfa8a2e2b",
"assets/assets/images/mascot.png": "1098e12aa59644b32368b6fc708c6d37",
"assets/assets/images/Property_1_Default.png": "28651c35b22f44a7a26309edb16bc08f",
"assets/assets/images/blike.png": "d3984f19024cff00ea92652cf76add93",
"assets/assets/images/ecom_c.png": "8b9ca38875d103b7840ea03e876a1149",
"assets/assets/images/btoggle.png": "1ba23ee3af0f47c6abaa61c0b5073a3b",
"assets/assets/images/PHOTO-2025-09-12-14-33-14-1757658826356.jpeg": "0601ef083817eb20bfcdb7fce17988f7",
"assets/assets/images/Property_1_Variant2-2.png": "4f4811c205fa48814d22a689f2318fbb",
"assets/assets/images/loan_s.png": "c3b8904c2d1deada5c15991ec4346ef7",
"assets/assets/images/forum_sel.png": "07703cdc2e6fa4c92921657b8ac62ab9",
"assets/assets/images/point_finger_icon.png": "9c86128f8dda4929363801f193d63070",
"assets/assets/images/Resale_HDB.png": "2a7bff37ad14c6721a83d6dfdf96b6e0",
"assets/assets/images/event_s.png": "7e82097dfebe64662d7982bc2a6839ee",
"assets/assets/images/Property_1_Variant2-3.png": "9609287cd9e6c3739d023a131e5b8cab",
"assets/assets/images/arrow-up-right.png": "49447e78ebd925cb9cf50eeacdc2af70",
"assets/assets/images/google.png": "a79a9aae3b436acf524cbbd96c9cf186",
"assets/assets/images/cs_ecom.png": "f2d5e6567caaf15e5c6378d4310a287f",
"assets/assets/images/handshake_icon.png": "d085d59c7c33008ee29a9e981365905b",
"assets/assets/images/blog_s.png": "31d1f294cecf9c2c5c1b6d9046deb282",
"assets/assets/images/Order_wh.png": "48b2c4edc4d5c1edbce4d75c61274aff",
"assets/assets/images/IMG_1961-1757564924074.jpeg": "b1f9482ac1a90156ed05de596944420e",
"assets/assets/images/amazon.png": "821893fe18f782db0c563ba3cbffcfa4",
"assets/assets/images/rocket_icon.png": "fc71b6c0b8e00cc518c54615446e5822",
"assets/assets/images/Budget.png": "342169fe3b02df23df43dd5b038ae9ee",
"assets/assets/images/Images_l.png": "e14ad8aa122fcb5c22579045fc812bc7",
"assets/assets/images/Renovation_l.png": "5364683481e2930b112960018dbc724e",
"assets/assets/images/event_un.png": "385ad3e5e5b108fe5958c41470370062",
"assets/assets/images/package_un.png": "e57f0ec7b9004a2aaaa92223716938e9",
"assets/assets/images/Googled.png": "60f727ea043b0d66e449b96dbc6da4ac",
"assets/assets/images/Images.png": "1c9afd6ed45d365711101d09462ac3ea",
"assets/assets/images/event_c.png": "808c215c48d5bc5bcdcc0dfdbe98d873",
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
