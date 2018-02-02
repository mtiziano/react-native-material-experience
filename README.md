
# react-native-material-experience

## Getting started

`$ npm install react-native-material-experience --save`

### Mostly automatic installation

`$ react-native link react-native-material-experience`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-material-experience` and add `RNMaterialExperience.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNMaterialExperience.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNMaterialExperiencePackage;` to the imports at the top of the file
  - Add `new RNMaterialExperiencePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-material-experience'
  	project(':react-native-material-experience').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-material-experience/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-material-experience')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNMaterialExperience.sln` in `node_modules/react-native-material-experience/windows/RNMaterialExperience.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Com.Reactlibrary.RNMaterialExperience;` to the usings at the top of the file
  - Add `new RNMaterialExperiencePackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNMaterialExperience from 'react-native-material-experience';

// TODO: What to do with the module?
RNMaterialExperience;
```
  