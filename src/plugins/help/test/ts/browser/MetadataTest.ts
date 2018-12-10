import { Pipeline, Mouse, Log } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyLoader, TinyUi } from '@ephox/mcagar';
import { Element } from '@ephox/sugar';

import HelpPlugin from 'tinymce/plugins/help/Plugin';
import 'tinymce/themes/silver/Theme';

import FakePlugin from '../module/test/FakePlugin';
import NoMetaFakePlugin from '../module/test/NoMetaFakePlugin';
import PluginAssert from '../module/PluginAssert';

import Selectors from '../module/Selectors';

UnitTest.asynctest('Browser Test: .MetadataTest', (success, failure) => {

  HelpPlugin();
  FakePlugin();
  NoMetaFakePlugin();

  TinyLoader.setup(function (editor, onSuccess, onFailure) {
    TinyUi(editor);

    Pipeline.async({},
      Log.steps('TBA', 'Help: Assert Help Plugin list contains getMetadata functionality', [
        Mouse.sClickOn(Element.fromDom(editor.getContainer()), Selectors.toolbarHelpButton),
        PluginAssert.sAssert(
          'Failed to list fake plugins',
          {
            'li a:contains("Help")': 1,
            'li a:contains("Fake")': 1,
            'li:contains("nometafake")': 1,
            'button:contains("Close")': 1
          },
          Selectors.dialog,
          Selectors.pluginsTab
        )
      ])
    , onSuccess, onFailure);
  }, {
    plugins: 'help fake nometafake',
    toolbar: 'help',
    theme: 'silver',
    skin_url: '/project/js/tinymce/skins/ui/oxide',
  }, success, failure);
});
