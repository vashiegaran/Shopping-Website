import { CustomaterialModule } from './customaterial.module';

describe('CustomaterialModule', () => {
  let customaterialModule: CustomaterialModule;

  beforeEach(() => {
    customaterialModule = new CustomaterialModule();
  });

  it('should create an instance', () => {
    expect(customaterialModule).toBeTruthy();
  });
});
