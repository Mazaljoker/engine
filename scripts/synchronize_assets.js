import { SynchronizeAssets } from '../src/core/assets/domain/synchronize-assets.js';
import { ApplicationConfig } from '../src/core/conf/infrastructure/application.config.js';
import { SynchronizeEnumTables } from '../src/core/assets/domain/synchronize-enum-tables.js';
import { FileStore } from '../src/core/file/infrastructure/adapter/file.store.js';
import { SynchronizeValeurTables } from '../src/core/assets/domain/synchronize-valeur-tables.js';
import { SynchronizeSolicitationsTables } from '../src/core/assets/domain/synchronize-solicitations-tables.js';
import { SynchronizeC1Tables } from '../src/core/assets/domain/synchronize-c1-tables.js';
import { SynchronizeDpeGesLimitValuesTables } from '../src/core/assets/domain/synchronize-dpe-ges-limit-values-tables.js';
import { AddAdditionnalUeValuesTables } from '../src/core/assets/domain/add-additionnal-ue-values-tables.js';

const fileStore = new FileStore();
const appConfig = new ApplicationConfig();
const synchronizeEnumTables = new SynchronizeEnumTables(fileStore, appConfig);
const synchronizeSolicitationsTables = new SynchronizeSolicitationsTables(fileStore, appConfig);
const synchronizeDpeGesLimitValuesTables = new SynchronizeDpeGesLimitValuesTables(
  fileStore,
  appConfig
);
const addAdditionnalUeValuesTables = new AddAdditionnalUeValuesTables(fileStore, appConfig);
const synchronizeC1Tables = new SynchronizeC1Tables(fileStore, appConfig);
const synchronizeValeurTables = new SynchronizeValeurTables(
  fileStore,
  appConfig,
  synchronizeSolicitationsTables,
  synchronizeDpeGesLimitValuesTables,
  addAdditionnalUeValuesTables,
  synchronizeC1Tables
);
const synchronizeAssets = new SynchronizeAssets(synchronizeEnumTables, synchronizeValeurTables);

await synchronizeAssets.execute();
