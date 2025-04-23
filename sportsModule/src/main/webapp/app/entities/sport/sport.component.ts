import { type Ref, defineComponent, inject, onMounted, ref } from 'vue';

import SportService from './sport.service';
import { type ISport } from '@/shared/model/sport.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Sport',
  setup() {
    const sportService = inject('sportService', () => new SportService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const sports: Ref<ISport[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveSports = async () => {
      isFetching.value = true;
      try {
        const res = await sportService().retrieve();
        sports.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveSports();
    };

    onMounted(async () => {
      await retrieveSports();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ISport) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeSport = async () => {
      try {
        await sportService().delete(removeId.value);
        const message = `A Sport is deleted with identifier ${removeId.value}`;
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveSports();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      sports,
      handleSyncList,
      isFetching,
      retrieveSports,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeSport,
    };
  },
});
