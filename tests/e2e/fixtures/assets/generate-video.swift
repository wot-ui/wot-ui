import Foundation
import AVFoundation
import CoreVideo
let output = URL(fileURLWithPath: CommandLine.arguments[1])
if FileManager.default.fileExists(atPath: output.path) { try FileManager.default.removeItem(at: output) }
let writer = try AVAssetWriter(outputURL: output, fileType: .mp4)
let width = 160, height = 90
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: width, AVVideoHeightKey: height, AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 100000, AVVideoProfileLevelKey: AVVideoProfileLevelH264BaselineAutoLevel]])
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB, kCVPixelBufferWidthKey as String: width, kCVPixelBufferHeightKey as String: height])
writer.add(input)
guard writer.startWriting() else { fatalError(String(describing: writer.error)) }
writer.startSession(atSourceTime: .zero)
for frame in 0..<30 {
  while !input.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.005) }
  var buffer: CVPixelBuffer?
  CVPixelBufferCreate(nil, width, height, kCVPixelFormatType_32ARGB, nil, &buffer)
  CVPixelBufferLockBaseAddress(buffer!, [])
  let bytes = CVPixelBufferGetBaseAddress(buffer!)!.assumingMemoryBound(to: UInt8.self)
  let rowBytes = CVPixelBufferGetBytesPerRow(buffer!)
  for y in 0..<height { for x in 0..<width {
    let index = y * rowBytes + x * 4
    bytes[index] = 255
    bytes[index + 1] = UInt8(30 + frame * 3)
    bytes[index + 2] = UInt8(80 + x / 2)
    bytes[index + 3] = UInt8(130 + y)
  } }
  CVPixelBufferUnlockBaseAddress(buffer!, [])
  guard adaptor.append(buffer!, withPresentationTime: CMTime(value: Int64(frame), timescale: 15)) else { fatalError("append failed") }
}
input.markAsFinished()
let semaphore = DispatchSemaphore(value: 0)
writer.finishWriting { semaphore.signal() }
semaphore.wait()
guard writer.status == .completed else { fatalError(String(describing: writer.error)) }
print("Created silent H.264 fixture: \(output.path)")
