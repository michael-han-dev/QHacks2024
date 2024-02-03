import cv2
from ultralytics import YOLO

video = 'demo1.mp4'
model = YOLO('yolov8n.pt')

cap = cv2.VideoCapture(video)

while cap.isOpened:
    ret, frame = cap.read()
    if ret:
    
        results = model.track(frame, persist=True)
        annotation = results[0].plot()
        cv2.imshow("Stream: ", annotation)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
    else:
        break

cap.release()
cv2.destroyAllWindows()
