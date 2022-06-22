# `@rajzik/danger-configuration`

## Usage

dangerfile.js

```javascript
import {
  checkForInvalidLocks,
  checkForConventionalPrefix,
  checkForConventionalSquashCommit,
} from '@rajzik/danger-configuration';

checkForInvalidLocks();
checkForConventionalPrefix();
checkForConventionalSquashCommit();
```
