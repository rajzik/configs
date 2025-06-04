# `@rajzik/danger-configuration`

## Usage

dangerfile.js

```javascript
import {
  checkForConventionalPrefix,
  checkForConventionalSquashCommit,
  checkForInvalidLocks,
} from '@rajzik/danger-configuration';

checkForInvalidLocks();
checkForConventionalPrefix();
checkForConventionalSquashCommit();
```
