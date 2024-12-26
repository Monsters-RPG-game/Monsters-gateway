import GetByIntentController from './subModules/getByIntent/index.js';
import GetByStageController from './subModules/getByStage/index.js';
import GetNarratorStoryController from './subModules/getNarratorStory/index.js';
import GetNpcStoryController from './subModules/getNpcStory/index.js';
import * as enums from '../../enums/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class StoryController extends AbstractController<enums.EControllers.Story> {
  /**
   * Register story controllers.
   * @returns Void.
   */
  protected init(): void {
    this.register(enums.EStoryActions.GetByIntent, new GetByIntentController());
    this.register(enums.EStoryActions.GetNarratorStory, new GetNarratorStoryController());
    this.register(enums.EStoryActions.GetByStage, new GetByStageController());
    this.register(enums.EStoryActions.GetNpcStory, new GetNpcStoryController());
  }
}
