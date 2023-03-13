3D graphics can improve the user experience of your application. It can make your application more attractive and engaging. It can also help you to explain your application better.

Today we will demonstrate how to use 3D models in ReactJS using react-fiber-three library.

# What is three.js?

three.js is a 3D library that allows you to create 3D models in the browser. It is a wrapper around WebGL and allows you to create 3D models in the browser.

# What is react-fiber-three?

react-fiber-three is a library that allows you to use three.js in ReactJS. It is a wrapper around three.js that allows you to use three.js in ReactJS.

# How to use 3D models in ReactJS?

First create a new react applicaiton

```sh
npx create-vite react-fiber-three-demo
```

Then install the required dependencies.

```sh
npm install three react-fiber-three
```

Notice we are installing two dependencies.

1. The first one is `three.js` which is the 3D library we are using.
2. The second one is `react-fiber-three` which is the library we are using to integrate three.js with ReactJS.

react-fiber-three is very easy to use and also very efficient.

# Create the Canvas

A canvas is the area where the 3D model will be rendered. We will create a canvas using the `Canvas` component from `react-fiber-three`.

```jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Stage } from "@react-three/drei";

const ComputersCanvas = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0.2, 0.1, 0.3], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <OrbitControls
        enableZoom={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        dampingFactor={0.3}
      />
      <Stage contactShadow={{ resolution: 1024, scale: 1000 }}>
        {children}
      </Stage>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
```

Let's break down the code piece by piece

## Canvas

Notice that we are setting some props to the Canvas component.

1. `frameloop` is set to `demand` which means that the canvas will only render when the user interacts with the canvas.
2. `shadows` is set to `true` which means that the canvas will have shadows.
3. `dpr` is set to `[1, 2]` which means that the canvas will have a resolution of 1 or 2 depending on the device.
4. `camera` is set to `{ position: [0.2, 0.1, 0.3], fov: 25 }` which means that the camera will be positioned at `[0.2, 0.1, 0.3]` and the field of view will be 25.
5. `gl` is set to `{ preserveDrawingBuffer: true }` which means that the canvas will preserve the drawing buffer.

You should definitely play around with these parameters to get the best results. To learn more about these parameters, you can read the [documentation of three.js](https://docs.pmnd.rs/react-three-fiber/api/canvas).

## Camera Control

To control the camera, we are using the `OrbitControls` component from `@react-three/drei`. This component allows us to control the camera using the mouse.

We are setting some props to the `OrbitControls` component.

1. `enableZoom` is set to `true` which means that the user can zoom in and out using the mouse.

2. `maxPolarAngle` and `minPolarAngle` is set to `Math.PI / 2` which means that the user can only rotate the camera vertically.

3. `dampingFactor` is set to `0.3` which means that the camera will have a damping factor of 0.3. It will smooth out the camera movement.

## Stage

This creates a stage for the 3D model with proper ligtning and shadows.

Now Let's load the model

# Get the actual 3d model.

There are several websites where you can get the free 3d models. https://sketchfab.com/ is the best one IMO.
Let's go there and download a free downloadable 3d model.

The one we are using today is this

https://sketchfab.com/3d-models/radio-shack-trs-80-model-1-9e3277cd95274f248d12b91dff3ea1cb

> Download the glTF version of the model

Get the unzipped version and put it inside the `public` folder of your project.

# Load the model

Let's create a new component called `ComputerModel ` and load the model in it.

```jsx
import React from "react";
import { useGLTF } from "@react-three/drei";

export const ComputerModel = () => {
  const computer = useGLTF("./radio_shack_trs-80_model_1/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={0.5}
        position={[0, -3.25, -1.5]}
      />
    </mesh>
  );
};
```

Let's analyze the code.

## useGLTF hook

Here we are using the `useGLTF` hook from `@react-three/drei` to load the model. We are passing the path to the model as the argument to the `useGLTF` hook.

Then we are returning a `mesh` component which is the actual 3D model.

## Lighting

We are also adding some lights to the model.

1. `hemisphereLight` is a light that is emitted from the sky. It is used to simulate the sun.
2. `spotLight` is a light that is emitted from a point in a specific direction. It is used to simulate the light from a lamp.

## Positioning the model

Finally, We are positioning the model using the `scale` and `position` props. We are scaling the model by 0.5 and positioning it at `[0, -3.25, -1.5]`.

Feel free to play around with these values.

# Render the model

Now let's render the model in the canvas.

```jsx
import "./App.css";
import CanvasComponent from "./components/CanvasComponent";
import Overlay from "./Overlay";
import { ComputerModel } from "./components/ComputerModel";

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "90vh" }}>
      <CanvasComponent>
        <ComputerModel />
      </CanvasComponent>
      <Overlay />
    </div>
  );
}

export default App;
```

Here we are rendering the `CanvasComponent` and passing the `ComputerModel` as a child to it.

# Improve the performance

Now you will notice that the model is not loading properly. It is because the model is too big and the browser is not able to load it properly.

So we are going to use the `Suspense` component from `react` to render the model only when it is loaded. This will improve the performance.

Following is the final version of the code.

```jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, Stage } from "@react-three/drei";
import CanvasLoader from "../Loader";

const ComputersCanvas = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0.2, 0.1, 0.3], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          dampingFactor={0.3}
        />
        <Stage contactShadow={{ resolution: 1024, scale: 1000 }}>
          {children}
        </Stage>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
```

You will notice that we have added a `Suspense` component and a `CanvasLoader` component. The `CanvasLoader` component is just a loader that will be shown when the model is loading. You can use any loader you want.

Here is the code for that.

```tsx
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
```

# Result:

On your browser you should have the following image.

![3d model render in ReactJS](https://cdn-images-1.medium.com/max/5504/1*DLKuQI7CCs6-ja2M2ipO8w.png)

Awesome right?

# Conclusion

In this tutorial, we have learned how to create a 3D model viewer using React and Three.js.
We have also learned how to load a 3D model in React and how to add lighting and shadows to the model.

I hope you learned something new today.

Have a wonderful day
