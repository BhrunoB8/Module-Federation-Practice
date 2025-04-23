import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import Sport from './sport.vue';
import SportService from './sport.service';
import AlertService from '@/shared/alert/alert.service';

type SportComponentType = InstanceType<typeof Sport>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Sport Management Component', () => {
    let sportServiceStub: SinonStubbedInstance<SportService>;
    let mountOptions: MountingOptions<SportComponentType>['global'];

    beforeEach(() => {
      sportServiceStub = sinon.createStubInstance<SportService>(SportService);
      sportServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          sportService: () => sportServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        sportServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Sport, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(sportServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.sports[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: SportComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Sport, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        sportServiceStub.retrieve.reset();
        sportServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        sportServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeSport();
        await comp.$nextTick(); // clear components

        // THEN
        expect(sportServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(sportServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
