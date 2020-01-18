import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    replace({
      'process.env.TOKEN': JSON.stringify(process.env.TOKEN)
    }),
    typescript()
  ]
}